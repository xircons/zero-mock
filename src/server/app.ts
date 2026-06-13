import type { Application, ErrorRequestHandler, NextFunction, Request, Response } from "express";
import cors from "cors";
import express from "express";
import { buildDynamicRouter } from "./routes/dynamicRouter";
import { requestLoggingMiddleware } from "./logger";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (res.headersSent) {
    return;
  }
  const message = err instanceof Error ? err.message : String(err);
  res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message, statusCode: 500 });
};

export type CreateAppOptions = {
  delayMs: number;
  corsOrigin?: string;
  corsMethods?: string;
  corsCredentials?: boolean;
};

function delayMiddleware(delayMs: number) {
  return (_req: Request, _res: Response, next: NextFunction): void => {
    if (delayMs <= 0) {
      next();
      return;
    }
    setTimeout(() => next(), delayMs);
  };
}

export function createApp(options: CreateAppOptions): Application {
  const app = express();
  
  app.use(cors({
    origin: options.corsOrigin && options.corsOrigin !== "*" ? options.corsOrigin.split(",") : "*",
    methods: options.corsMethods || "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: options.corsCredentials || false,
  }));
  
  app.use(express.json());
  app.use(requestLoggingMiddleware);
  app.use(delayMiddleware(options.delayMs));
  app.use("/", buildDynamicRouter());
  app.use(errorHandler);
  return app;
}
