import { randomUUID } from "crypto";
import type { NextFunction, Request, RequestHandler, Response, Router } from "express";
import express from "express";
import { JsonStore } from "../../store/jsonStore";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
  const resources = Object.keys(JsonStore.getData());

  for (const resource of resources) {
    router.get(
      `/${resource}/:id`,
      asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const collection = JsonStore.getData()[resource];
        const item = findItemById(collection, id);
        if (item === undefined) {
          itemNotFound(res, resource, id);
          return;
        }
        res.json(item);
      }),
    );

    router.get(`/${resource}`, (_req: Request, res: Response) => {
      res.json(JsonStore.getData()[resource]);
    });

    router.post(
      `/${resource}`,
      asyncHandler(async (req: Request, res: Response) => {
        if (!isPlainObject(req.body)) {
          badBody(res);
          return;
        }
        const collection = JsonStore.getData()[resource];
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
      `/${resource}/:id`,
      asyncHandler(async (req: Request, res: Response) => {
        if (!isPlainObject(req.body)) {
          badBody(res);
          return;
        }
        const { id: idParam } = req.params;
        const collection = JsonStore.getData()[resource];
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
      `/${resource}/:id`,
      asyncHandler(async (req: Request, res: Response) => {
        if (!isPlainObject(req.body)) {
          badBody(res);
          return;
        }
        const { id: idParam } = req.params;
        const collection = JsonStore.getData()[resource];
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
      `/${resource}/:id`,
      asyncHandler(async (req: Request, res: Response) => {
        const { id: idParam } = req.params;
        const collection = JsonStore.getData()[resource];
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
  }

  return router;
}
