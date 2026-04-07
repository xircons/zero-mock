import type { Application, ErrorRequestHandler } from "express";
import cors from "cors";
import express from "express";
import { buildDynamicRouter } from "./routes/dynamicRouter";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (res.headersSent) {
    return;
  }
  const message = err instanceof Error ? err.message : String(err);
  res.status(500).json({ error: message });
};

export function createApp(): Application {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/", buildDynamicRouter());
  app.use(errorHandler);
  return app;
}
