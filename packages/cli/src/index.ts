#!/usr/bin/env node
import * as chokidar from "chokidar";
import pc from "picocolors";
import { Command } from "commander";
import { JsonStore } from "./store/jsonStore";
import { bootstrap } from "./server/bootstrap";
import { runWizard } from "./cli-wizard";
import { validateConfig, acquireLock, printError, printFatal } from "./errors";
import { clearSavedConfig } from "./config-store";
import { registerCleanupTask } from "./cleanup";

type CliOpts = {
  file?: string;
  port?: string;
  delay?: string;
  watch?: boolean;
  corsOrigin?: string;
  corsMethods?: string;
  corsCredentials?: boolean;
  reset?: boolean;
};

function parseDelayMs(raw: string): number | null {
  const trimmed = raw.trim();
  if (!/^\d+$/.test(trimmed)) {
    return null;
  }
  return Number.parseInt(trimmed, 10);
}

const program = new Command();

let watcher: chokidar.FSWatcher | null = null;

function startFileWatcher(filePath: string): void {
  let reloadTimeout: ReturnType<typeof setTimeout> | null = null;

  if (watcher) {
    watcher.close().catch(() => {});
    watcher = null;
  }

  const reload = async (): Promise<void> => {
    try {
      await JsonStore.load(filePath, true);
      console.log(`\n  ${pc.dim('│')}  ${pc.green('✓')} ${pc.dim('Hot reloaded data from')} ${pc.white(filePath)}`);
    } catch (err: any) {
      printError('WATCH_RELOAD_FAILED', err.message);
    }
  };

  try {
    watcher = chokidar.watch(filePath, { persistent: true, ignoreInitial: true });
    watcher
      .on("change", () => {
        if (reloadTimeout) clearTimeout(reloadTimeout);
        reloadTimeout = setTimeout(() => void reload(), 100);
      })
      .on("error", (err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        printError('WATCH_FAILED', msg);
      });
  } catch (err: any) {
    printError('WATCH_FAILED', err.message);
  }
}

program
  .name("zero-mock")
  .description("Generate a REST API from a JSON file")
  .option("-f, --file <path>", "path to the source JSON file")
  .option("-p, --port <number>", "HTTP port")
  .option("-d, --delay <ms>", "delay each request by this many ms (0 = off)")
  .option("-w, --watch", "reload JSON from disk when the file changes")
  .option("--cors-origin <origins>", "comma-separated list of allowed origins (e.g., http://localhost:3000)", "*")
  .option("--cors-methods <methods>", "comma-separated list of allowed HTTP methods", "GET,HEAD,PUT,PATCH,POST,DELETE")
  .option("--cors-credentials", "enable CORS credentials (cookies, authorization headers)", false)
  .option("--reset", "clear saved wizard configuration")
  .action(async (opts: CliOpts) => {
    if (process.argv.includes('--reset')) {
      clearSavedConfig();
      process.exit(0);
    }
    
    let { file, port: portRaw, delay: delayRaw, watch } = opts;

    if (!file && !portRaw && !delayRaw && watch === undefined) {
      const wizardConfig = await runWizard();
      file = wizardConfig.file;
      portRaw = wizardConfig.port;
      delayRaw = wizardConfig.delay;
      watch = wizardConfig.watch;
    } else {
      if (!file) {
        console.error("error: required option '-f, --file <path>' not specified");
        process.exit(1);
        return;
      }
      portRaw = portRaw ?? "3000";
      delayRaw = delayRaw ?? "0";
      watch = watch ?? false;
    }

    const port = Number.parseInt(portRaw, 10);
    const delayMs = parseDelayMs(delayRaw);
    if (delayMs === null) {
      console.error("error: --delay must be a non-negative integer");
      process.exit(1);
      return;
    }

    const filePath = file;

    // Ordered Validation Step 1 & 2
    validateConfig(filePath, port);
    acquireLock(filePath);

    try {
      await JsonStore.load(filePath);
    } catch (err: any) {
      // JsonStore.load handles its own printFatal internally, 
      // but we catch to ensure we don't crash without formatting.
      printFatal('UNKNOWN', err.message);
    }

    try {
      await bootstrap(port, filePath, watch, { 
        delayMs,
        corsOrigin: opts.corsOrigin,
        corsMethods: opts.corsMethods,
        corsCredentials: opts.corsCredentials,
      });
    } catch (err: any) {
      // Bootstrap will handle EADDRINUSE internally, catching just in case.
      printFatal('UNKNOWN', err.message);
    }

    if (watch) {
      startFileWatcher(filePath);
    }

    const cleanup = () => {
      if (watcher) {
        watcher.close().catch(() => {});
      }
    };
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
  });

program.parse(process.argv);