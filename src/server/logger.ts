import type { Request, Response, NextFunction } from 'express';
import pc from 'picocolors';

export function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const start = new Date();
  
  res.on("finish", () => {
    const timeStr = start.toLocaleTimeString('en-US', { hour12: true });
    
    const methodStr = pc.inverse(req.method.padEnd(6, ' '));
    
    let statusStr = String(res.statusCode);
    if (res.statusCode >= 400) {
      statusStr = pc.inverse(statusStr);
    } else {
      statusStr = pc.bold(pc.white(statusStr));
    }
    
    console.log(`${pc.dim(`[${timeStr}]`)} │ ${methodStr} │ ${req.path} ➔ ${statusStr}`);
  });
  next();
}

export function printStartupBanner(file: string, port: number, isWatch: boolean, resources: string[]): void {
  console.log(`\n${pc.bgWhite(pc.black(" █ ZERO-MOCK SERVER READY "))}`);
  console.log(pc.dim("─────────────────────────────────────────────────────────────"));
  console.log(`Target File: ${file}`);
  console.log(`Local URL:   http://localhost:${port}`);
  console.log(`Watch Mode:  ${isWatch ? "Active (Auto-reloading on save)" : "Inactive"}\n`);

  console.log(pc.bold(pc.white("AVAILABLE RESOURCES")));
  console.log(pc.dim("─────────────────────────────────────────────────────────────"));
  
  const base = `http://localhost:${port}`;
  
  const get = pc.bgWhite(pc.black(' GET '));
  const post = pc.bgWhite(pc.black(' POST '));
  const put = pc.bgWhite(pc.black(' PUT '));
  const patch = pc.bgWhite(pc.black(' PATCH '));
  const del = pc.bgWhite(pc.black(' DEL '));

  for (const resource of resources) {
    console.log(`${pc.bold(pc.white(`■ /${resource}`))}`);
    console.log(`  ${get}   ${post}                 ${base}/${resource}`);
    console.log(`  ${get}   ${put}   ${patch} ${del}  ${base}/${resource}/:id\n`);
  }
  
  console.log(pc.bold(pc.white("REQUEST LOGS")));
  console.log(pc.dim("─────────────────────────────────────────────────────────────"));
}