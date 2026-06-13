import { randomBytes } from "crypto";
import { dirname, join } from "path";
import { readFile, rename, unlink, writeFile } from "fs/promises";
import type { JsonData } from "../types";
import { printError, printFatal } from "../errors";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

class JsonStoreImpl {
  private data: JsonData = {};
  private backingPath: string | null = null;
  /** Serializes concurrent save() calls so writes are not interleaved. */
  private saveChain: Promise<void> = Promise.resolve();

  async load(filePath: string, isReload = false): Promise<void> {
    let raw: string;
    try {
      raw = await readFile(filePath, "utf8");
    } catch (err: any) {
      if (isReload) throw new Error(`Unreadable: ${err.message}`);
      printFatal('FILE_UNREADABLE', err.message);
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err: any) {
      if (isReload) throw new Error(`Parse error: ${err.message}`);
      printFatal('JSON_INVALID', err.message);
    }

    if (!isPlainObject(parsed)) {
      const msg = `got ${parsed === null ? "null" : Array.isArray(parsed) ? "array" : typeof parsed}`;
      if (isReload) throw new Error(`Root not an object (${msg})`);
      printFatal('JSON_NOT_OBJECT', msg);
    }

    const keys = Object.keys(parsed);
    if (keys.length === 0) {
      printError('JSON_EMPTY');
    }

    const data: JsonData = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (!Array.isArray(value)) {
        const msg = `property "${key}" must be an array.`;
        if (isReload) throw new Error(msg);
        printFatal('JSON_INVALID', msg);
      }
      data[key] = value as unknown[];
    }
    
    this.data = data;
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