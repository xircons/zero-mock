import type { CreateAppOptions } from "./app";
import { createApp } from "./app";
import { JsonStore } from "../store/jsonStore";
import { printStartupBanner } from "./logger";

export async function bootstrap(port: number, file: string, watch: boolean, appOptions: CreateAppOptions): Promise<void> {
  const app = createApp(appOptions);

  await new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve();
    });
    server.on("error", reject);
  });

  const resources = Object.keys(JsonStore.getData());
  printStartupBanner(file, port, watch, resources);
}
