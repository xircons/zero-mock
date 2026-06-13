import type { Request, Response, NextFunction } from 'express';
import pc from 'picocolors';

const formatMethod = (method: string) => {
  // Truncate or pad to exactly 5 characters
  const padded = method.substring(0, 5).padEnd(5, ' ');
  return pc.inverse(` ${padded} `); // 7 chars visually with spaces
};

export function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const start = new Date();
  
  res.on("finish", () => {
    const timeStr = start.toLocaleTimeString('en-US', { hour12: true });
    
    const methodStr = formatMethod(req.method);
    
    let statusStr = String(res.statusCode);
    if (res.statusCode >= 400) {
      statusStr = pc.inverse(` ${statusStr} `);
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
  
  const get = formatMethod("GET");
  const post = formatMethod("POST");
  const put = formatMethod("PUT");
  const patch = formatMethod("PATCH");
  const del = formatMethod("DEL");

  for (const resource of resources) {
    console.log(`${pc.bold(pc.white(`■ /${resource}`))}`);
    console.log(`  ${get}  ${post}                 ${base}/${resource}`);
    console.log(`  ${get}  ${put}  ${patch}  ${del}  ${base}/${resource}/:id\n`);
  }
  
  console.log(pc.bold(pc.white("REQUEST LOGS")));
  console.log(pc.dim("─────────────────────────────────────────────────────────────"));
}