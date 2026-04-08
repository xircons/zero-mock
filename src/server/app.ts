import type { Application, ErrorRequestHandler, NextFunction, Request, Response } from "express";
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

export type CreateAppOptions = {
  delayMs: number;
};

function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.on("finish", () => {
    console.log(`[${req.method}] ${req.path} - ${res.statusCode}`);
  });
  next();
}

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
  app.use(cors());
  app.use(express.json());
  app.use(requestLoggingMiddleware);
  app.use(delayMiddleware(options.delayMs));
  app.use("/", buildDynamicRouter());
  app.use(errorHandler);
  return app;
}
