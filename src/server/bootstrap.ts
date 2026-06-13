import type { CreateAppOptions } from "./app";
import { createApp } from "./app";
import { JsonStore } from "../store/jsonStore";
import { printStartupBanner } from "./logger";
import { printFatal } from "../errors";

export async function bootstrap(port: number, file: string, watch: boolean, appOptions: CreateAppOptions): Promise<void> {
  const app = createApp(appOptions);

  await new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve();
    });
    server.on("error", (e: NodeJS.ErrnoException) => {
      if (e.code === 'EADDRINUSE') {
        printFatal('PORT_IN_USE', `Port ${port} — ${e.message}`);
      } else {
        printFatal('UNKNOWN', e.message);
      }
      reject(e);
    });
  });

  const resources = Object.keys(JsonStore.getData());
  printStartupBanner(file, port, watch, appOptions.delayMs, resources);
}
