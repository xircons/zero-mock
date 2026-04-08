#!/usr/bin/env node
import { watch } from "fs";
import { Command } from "commander";
import { JsonStore } from "./store/jsonStore";
import { bootstrap } from "./server/bootstrap";

type CliOpts = {
  file: string;
  port: string;
  delay: string;
  watch: boolean;
};

function parseDelayMs(raw: string): number | null {
  const trimmed = raw.trim();
  if (!/^\d+$/.test(trimmed)) {
    return null;
  }
  return Number.parseInt(trimmed, 10);
}

function startFileWatcher(filePath: string): void {
  let reloadInFlight = false;
  const reload = async (): Promise<void> => {
    if (reloadInFlight) {
      return;
    }
    reloadInFlight = true;
    try {
      await JsonStore.load(filePath);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[watch] Could not reload "${filePath}": ${message}`);
    } finally {
      reloadInFlight = false;
    }
  };

  try {
    watch(filePath, { persistent: true }, () => {
      void reload();
    });
    console.log(`[watch] Watching "${filePath}" for changes.`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[watch] Failed to watch "${filePath}": ${message}`);
  }
}

const program = new Command();

program
  .name("zero-mock")
  .description("Generate a REST API from a JSON file")
  .requiredOption("-f, --file <path>", "path to the source JSON file")
  .option("-p, --port <number>", "HTTP port", "3000")
  .option("-d, --delay <ms>", "delay each request by this many ms (0 = off)", "0")
  .option("-w, --watch", "reload JSON from disk when the file changes", false)
  .action(async (opts: CliOpts) => {
    const port = Number.parseInt(opts.port, 10);
    if (Number.isNaN(port) || port < 1 || port > 65535) {
      console.error("error: --port must be a number between 1 and 65535");
      process.exit(1);
      return;
    }

    const delayMs = parseDelayMs(opts.delay);
    if (delayMs === null) {
      console.error("error: --delay must be a non-negative integer");
      process.exit(1);
      return;
    }

    const filePath = opts.file;

    try {
      await JsonStore.load(filePath);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(message);
      process.exit(1);
      return;
    }

    try {
      await bootstrap(port, { delayMs });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Failed to start server: ${message}`);
      process.exit(1);
      return;
    }

    if (opts.watch) {
      startFileWatcher(filePath);
    }
  });

program.parse(process.argv);
