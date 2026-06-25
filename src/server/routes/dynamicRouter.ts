import { randomUUID } from "crypto";
import type { NextFunction, Request, RequestHandler, Response, Router } from "express";
import express from "express";
import { z } from "zod";
import { JsonStore } from "../../store/jsonStore";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function firstQueryValue(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return firstQueryValue(value[0]);
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "object") {
    return undefined;
  }
  return String(value);
}

function parsePagination(query: Record<string, unknown>): { page: number; limit: number } | null {
  const pageRaw = firstQueryValue(query["_page"]);
  const limitRaw = firstQueryValue(query["_limit"]);
  if (pageRaw === undefined || limitRaw === undefined) {
    return null;
  }
  const pageTrim = pageRaw.trim();
  const limitTrim = limitRaw.trim();
  if (!/^\d+$/.test(pageTrim) || !/^\d+$/.test(limitTrim)) {
    return null;
  }
  const page = Number.parseInt(pageTrim, 10);
  const limit = Number.parseInt(limitTrim, 10);
  if (page < 1 || limit < 1) {
    return null;
  }
  return { page, limit };
}

function filterCollection(items: unknown[], query: Record<string, unknown>): unknown[] {
  let result = items;

  // Sorting
  const sort = firstQueryValue(query["_sort"]);
  const order = firstQueryValue(query["_order"])?.toLowerCase() === "desc" ? -1 : 1;

  if (sort) {
    result = [...result].sort((a, b) => {
      if (!isPlainObject(a) || !isPlainObject(b)) return 0;
      const valA = a[sort];
      const valB = b[sort];
      if (valA === valB) return 0;
      if (valA === undefined) return order;
      if (valB === undefined) return -order;
      if (typeof valA === "number" && typeof valB === "number") return (valA - valB) * order;
      return String(valA).localeCompare(String(valB)) * order;
    });
  }

  const filterEntries = Object.entries(query).filter(([k]) => !["_page", "_limit", "_sort", "_order"].includes(k));
  if (filterEntries.length === 0) {
    return result;
  }
  
  return result.filter((item) => {
    if (!isPlainObject(item)) {
      return false;
    }
    const rec = item;
    for (const [key, qVal] of filterEntries) {
      const want = firstQueryValue(qVal);
      if (want === undefined) continue;

      let field = key;
      let op = "eq";

      if (key.endsWith("_gte")) { field = key.slice(0, -4); op = "gte"; }
      else if (key.endsWith("_lte")) { field = key.slice(0, -4); op = "lte"; }
      else if (key.endsWith("_like")) { field = key.slice(0, -5); op = "like"; }

      const actual = rec[field];
      
      if (op === "eq") {
        if (actual != want) return false;
      } else if (op === "gte") {
        if (Number(actual) < Number(want)) return false;
      } else if (op === "lte") {
        if (Number(actual) > Number(want)) return false;
      } else if (op === "like") {
        if (actual === undefined || actual === null) return false;
        const escaped = want.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (!new RegExp(escaped, 'i').test(String(actual))) return false;
      }
    }
    return true;
  });
}

function isRecordWithId(item: unknown): item is Record<string, unknown> & { id: unknown } {
  if (item === null || typeof item !== "object" || Array.isArray(item)) {
    return false;
  }
  const rec = item as Record<string, unknown>;
  return Object.prototype.hasOwnProperty.call(rec, "id");
}

function findItemById(items: unknown[], idParam: string): unknown | undefined {
  return items.find((item) => {
    if (!isRecordWithId(item)) {
      return false;
    }
    return item.id == idParam;
  });
}

function findIndexById(items: unknown[], idParam: string): number {
  return items.findIndex((item) => {
    if (!isRecordWithId(item)) {
      return false;
    }
    return item.id == idParam;
  });
}

function itemNotFound(res: Response, resource: string, id: string): void {
  res.status(404).json({ error: `No item with id "${id}" in "${resource}".` });
}

function badBody(res: Response): void {
  res.status(400).json({ error: "Request body must be a JSON object." });
}

/**
 * Infer a zod schema from the first item in a collection.
 * Returns null if the collection is empty (skip validation).
 * The schema is "partial" so that POST/PATCH with missing optional fields still pass —
 * only fields that ARE present are type-checked.
 */
function inferSchema(collection: unknown[]): z.ZodTypeAny | null {
  const first = collection.find(isPlainObject);
  if (!first) return null;
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const [key, value] of Object.entries(first)) {
    if (key === "id") continue;
    if (typeof value === "string")       shape[key] = z.string();
    else if (typeof value === "number")  shape[key] = z.number();
    else if (typeof value === "boolean") shape[key] = z.boolean();
    else                                 shape[key] = z.unknown();
  }
  return z.object(shape).partial();
}

function validateBody(res: Response, collection: unknown[], body: unknown): boolean {
  const schema = inferSchema(collection);
  if (!schema) return true; // empty collection → skip
  const result = schema.safeParse(body);
  if (!result.success) {
    const messages = result.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`);
    res.status(400).json({ error: "Validation failed.", details: messages });
    return false;
  }
  return true;
}

function numericIdValue(id: unknown): number | null {
  if (typeof id === "number" && Number.isFinite(id) && Number.isInteger(id)) {
    return id;
  }
  if (typeof id === "string" && /^\d+$/.test(id)) {
    const n = Number.parseInt(id, 10);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

/**
 * Next id: max numeric id + 1 among items with integer or all-digit string ids;
 * otherwise a new UUID string.
 */
function nextIdForCollection(items: unknown[]): string | number {
  let max = Number.NEGATIVE_INFINITY;
  for (const item of items) {
    if (!isRecordWithId(item)) {
      continue;
    }
    const n = numericIdValue(item.id);
    if (n !== null && n > max) {
      max = n;
    }
  }
  if (max !== Number.NEGATIVE_INFINITY) {
    return max + 1;
  }
  return randomUUID();
}

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): RequestHandler {
  return (req, res, next) => {
    void fn(req, res, next).catch(next);
  };
}

export function buildDynamicRouter(): Router {
  const router = express.Router();

  router.get(
    `/:resource/:id`,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { resource, id } = req.params;
      const collection = JsonStore.getData()[resource];
      if (!collection) {
        return next();
      }
      const item = findItemById(collection, id);
      if (item === undefined) {
        itemNotFound(res, resource, id);
        return;
      }
      res.json(item);
    }),
  );

  router.get(
    `/:resource`,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { resource } = req.params;
      const collection = JsonStore.getData()[resource];
      if (!collection) {
        return next();
      }
      const query = req.query as Record<string, unknown>;
      let rows = filterCollection(collection, query);
      const total = rows.length;
      res.setHeader("X-Total-Count", total);

      const pageInfo = parsePagination(query);
      if (pageInfo !== null) {
        const start = (pageInfo.page - 1) * pageInfo.limit;
        rows = rows.slice(start, start + pageInfo.limit);
        
        const totalPages = Math.ceil(total / pageInfo.limit);
        res.json({
          data: rows,
          pagination: {
            total,
            page: pageInfo.page,
            limit: pageInfo.limit,
            totalPages
          }
        });
        return;
      }
      res.json(rows);
    }),
  );

  router.post(
    `/:resource`,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { resource } = req.params;
      const collection = JsonStore.getData()[resource];
      if (!collection) {
        return next();
      }
      if (!isPlainObject(req.body)) {
        badBody(res);
        return;
      }
      if (!validateBody(res, collection, req.body)) return;
      const newId = nextIdForCollection(collection);
      const rawBody = req.body as Record<string, unknown>;
      const rest: Record<string, unknown> = { ...rawBody };
      delete rest["id"];
      const newItem: Record<string, unknown> = { ...rest, id: newId };
      collection.push(newItem);
      await JsonStore.save();
      res.status(201).json(newItem);
    }),
  );

  router.put(
    `/:resource/:id`,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { resource, id: idParam } = req.params;
      const collection = JsonStore.getData()[resource];
      if (!collection) {
        return next();
      }
      if (!isPlainObject(req.body)) {
        badBody(res);
        return;
      }
      if (!validateBody(res, collection, req.body)) return;
      const index = findIndexById(collection, idParam);
      if (index === -1) {
        itemNotFound(res, resource, idParam);
        return;
      }
      const previous = collection[index];
      const preservedId = isRecordWithId(previous) ? previous.id : idParam;
      const rawBody = req.body as Record<string, unknown>;
      const rest: Record<string, unknown> = { ...rawBody };
      delete rest["id"];
      const updated: Record<string, unknown> = { ...rest, id: preservedId };
      collection[index] = updated;
      await JsonStore.save();
      res.json(updated);
    }),
  );

  router.patch(
    `/:resource/:id`,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { resource, id: idParam } = req.params;
      const collection = JsonStore.getData()[resource];
      if (!collection) {
        return next();
      }
      if (!isPlainObject(req.body)) {
        badBody(res);
        return;
      }
      if (!validateBody(res, collection, req.body)) return;
      const index = findIndexById(collection, idParam);
      if (index === -1) {
        itemNotFound(res, resource, idParam);
        return;
      }
      const current = collection[index];
      if (!isPlainObject(current)) {
        res.status(400).json({ error: "Existing item must be an object to PATCH." });
        return;
      }
      const preservedId = isRecordWithId(current) ? current.id : idParam;
      const rawBody = req.body as Record<string, unknown>;
      const patch: Record<string, unknown> = { ...rawBody };
      delete patch["id"];
      const updated: Record<string, unknown> = { ...current, ...patch, id: preservedId };
      collection[index] = updated;
      await JsonStore.save();
      res.json(updated);
    }),
  );

  router.delete(
    `/:resource/:id`,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { resource, id: idParam } = req.params;
      const collection = JsonStore.getData()[resource];
      if (!collection) {
        return next();
      }
      const index = findIndexById(collection, idParam);
      if (index === -1) {
        itemNotFound(res, resource, idParam);
        return;
      }
      collection.splice(index, 1);
      await JsonStore.save();
      res.status(204).send();
    }),
  );

  return router;
}
