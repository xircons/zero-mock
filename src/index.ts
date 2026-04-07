#!/usr/bin/env node
import { Command } from "commander";
import { JsonStore } from "./store/jsonStore";
import { bootstrap } from "./server/bootstrap";

const program = new Command();

program
  .name("zero-mock")
  .description("Generate a REST API from a JSON file")
  .requiredOption("-f, --file <path>", "path to the source JSON file")
  .option("-p, --port <number>", "HTTP port", "3000")
  .action(async (opts: { file: string; port: string }) => {
    const port = Number.parseInt(opts.port, 10);
    if (Number.isNaN(port) || port < 1 || port > 65535) {
      console.error("error: --port must be a number between 1 and 65535");
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
      await bootstrap(port);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Failed to start server: ${message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
