import type { Request, Response, NextFunction } from 'express';
import pc from 'picocolors';

export function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const start = new Date();
  
  res.on("finish", () => {
    const timeStr = start.toLocaleTimeString('en-US', { hour12: true });
    
    let methodColor = pc.white;
    switch (req.method) {
      case 'GET': methodColor = pc.green; break;
      case 'POST': methodColor = pc.blue; break;
      case 'PUT':
      case 'PATCH': methodColor = pc.yellow; break;
      case 'DELETE': methodColor = pc.red; break;
    }
    
    const methodStr = methodColor(req.method.padEnd(6, ' '));
    
    let statusColor = pc.white;
    if (res.statusCode >= 200 && res.statusCode < 300) statusColor = pc.green;
    else if (res.statusCode >= 400 && res.statusCode < 500) statusColor = pc.yellow;
    else if (res.statusCode >= 500) statusColor = pc.red;
    
    const statusStr = statusColor(String(res.statusCode));
    
    console.log(`${pc.dim(`[${timeStr}]`)} │ ${methodStr} │ ${req.path} ➔ ${statusStr}`);
  });
  next();
}

export function printStartupBanner(file: string, port: number, isWatch: boolean, resources: string[]): void {
  console.log(`\n${pc.bold(pc.cyan("ZERO-MOCK SERVER READY"))}`);
  console.log(pc.dim("─────────────────────────────────────────────────────────────"));
  console.log(`Target File: ${file}`);
  console.log(`Local URL:   http://localhost:${port}`);
  console.log(`Watch Mode:  ${isWatch ? "Active (Auto-reloading on save)" : "Inactive"}\n`);

  console.log(pc.bold("AVAILABLE RESOURCES"));
  console.log(pc.dim("─────────────────────────────────────────────────────────────"));
  
  const base = `http://localhost:${port}`;
  
  for (const resource of resources) {
    console.log(`${pc.cyan("❯")} ${pc.bold(pc.white(`/${resource}`))}`);
    console.log(`  ${pc.green("GET")}   ${pc.blue("POST")}                 ${base}/${resource}`);
    console.log(`  ${pc.green("GET")}   ${pc.yellow("PUT")}   ${pc.yellow("PATCH")}   ${pc.red("DELETE")} ${base}/${resource}/:id\n`);
  }
  
  console.log(pc.bold("REQUEST LOGS"));
  console.log(pc.dim("─────────────────────────────────────────────────────────────"));
}
