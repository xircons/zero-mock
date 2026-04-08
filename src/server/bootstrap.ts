import type { CreateAppOptions } from "./app";
import { createApp } from "./app";
import { JsonStore } from "../store/jsonStore";

export async function bootstrap(port: number, appOptions: CreateAppOptions): Promise<void> {
  const app = createApp(appOptions);

  await new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve();
    });
    server.on("error", reject);
  });

  const base = `http://localhost:${port}`;
  console.log(`🚀 Server is running at ${base}`);
  console.log("Read/write API: GET, POST, PUT, PATCH, DELETE are active for each resource below.\n");

  for (const resource of Object.keys(JsonStore.getData())) {
    console.log(`  ${resource}`);
    console.log(`    GET    POST              ${base}/${resource}`);
    console.log(`    GET    PUT   PATCH DELETE  ${base}/${resource}/:id`);
  }
}
