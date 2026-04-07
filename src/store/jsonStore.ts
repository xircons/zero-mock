import { randomBytes } from "crypto";
import { dirname, join } from "path";
import { readFile, rename, unlink, writeFile } from "fs/promises";
import type { JsonData } from "../types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseJsonStorePayload(raw: string, filePath: string): JsonData {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Invalid JSON in "${filePath}": ${message}`);
  }

  if (!isPlainObject(parsed)) {
    throw new Error(
      `JSON root in "${filePath}" must be a non-null object (got ${parsed === null ? "null" : Array.isArray(parsed) ? "array" : typeof parsed}).`,
    );
  }

  const data: JsonData = {};
  for (const [key, value] of Object.entries(parsed)) {
    if (!Array.isArray(value)) {
      throw new Error(
        `Invalid mock database shape in "${filePath}": property "${key}" must be an array.`,
      );
    }
    data[key] = value as unknown[];
  }
  return data;
}

class JsonStoreImpl {
  private data: JsonData = {};
  private backingPath: string | null = null;
  /** Serializes concurrent save() calls so writes are not interleaved. */
  private saveChain: Promise<void> = Promise.resolve();

  async load(filePath: string): Promise<void> {
    let raw: string;
    try {
      raw = await readFile(filePath, "utf8");
    } catch (err) {
      const code = err && typeof err === "object" && "code" in err ? String((err as NodeJS.ErrnoException).code) : "";
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(
        code
          ? `Could not read JSON file "${filePath}" (${code}): ${message}`
          : `Could not read JSON file "${filePath}": ${message}`,
      );
    }

    this.data = parseJsonStorePayload(raw, filePath);
    this.backingPath = filePath;
  }

  getData(): JsonData {
    return this.data;
  }

  /**
   * Writes the current in-memory state to the backing file using a temp file + rename
   * for an atomic-style replace on POSIX; serializes overlapping saves.
   */
  async save(): Promise<void> {
    if (this.backingPath === null) {
      throw new Error("JsonStore.save() called before load(); no file path is set.");
    }

    const run = async (): Promise<void> => {
      const target = this.backingPath!;
      const dir = dirname(target);
      const tmp = join(dir, `.zero-mock-${randomBytes(8).toString("hex")}.tmp`);
      const payload = `${JSON.stringify(this.data, null, 2)}\n`;
      try {
        await writeFile(tmp, payload, "utf8");
        await rename(tmp, target);
      } catch (err) {
        await unlink(tmp).catch(() => {});
        const message = err instanceof Error ? err.message : String(err);
        throw new Error(`Could not write JSON file "${target}": ${message}`);
      }
    };

    const next = this.saveChain.then(run, run);
    this.saveChain = next.catch(() => {});
    await next;
  }
}

/** Singleton store for the backing JSON file (system of record). */
export const JsonStore = new JsonStoreImpl();
