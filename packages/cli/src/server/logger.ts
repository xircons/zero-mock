import type { Request, Response, NextFunction } from 'express';
import pc from 'picocolors';
import { stripAnsi, sectionHeader, renderConfigPanel } from '../cli-wizard';

export function getMethodBadge(method: string): string {
  const m = method.toUpperCase();
  const padded = m.padEnd(6, ' ');
  const inner = `[${padded}]`;
  
  switch(m) {
    case 'GET': return pc.bold(pc.cyan(inner));
    case 'POST': return pc.bold(pc.green(inner));
    case 'PUT': return pc.bold(pc.yellow(inner));
    case 'PATCH': return pc.bold(pc.magenta(inner));
    case 'DELETE': return pc.bold(pc.red(inner));
    default: return pc.bold(pc.white(inner));
  }
}

export function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const startMs = Date.now();
  const start = new Date();
  
  res.on("finish", () => {
    const timeStr = start.toLocaleTimeString('en-US', { hour12: true });
    const duration = Date.now() - startMs;
    
    const badge = getMethodBadge(req.method);
    
    let statusStr = String(res.statusCode);
    if (res.statusCode >= 200 && res.statusCode < 300) statusStr = pc.green(statusStr);
    else if (res.statusCode >= 300 && res.statusCode < 400) statusStr = pc.cyan(statusStr);
    else if (res.statusCode >= 400 && res.statusCode < 500) statusStr = pc.yellow(statusStr);
    else if (res.statusCode >= 500) statusStr = pc.red(statusStr);
    
    const pathPadded = req.path.length > 20 ? req.path : req.path.padEnd(20, ' ');
    
    console.log(`${pc.dim(`[${timeStr}]`)} ${badge} ${pc.white(pathPadded)} ${statusStr} ${pc.dim(`${duration}ms`)}`);
  });
  next();
}

export function getMonochromeBadge(method: string): string {
  const m = method.toUpperCase();
  const padded = m.padEnd(6, ' ');
  return `[${padded}]`;
}

export function printStartupBanner(file: string, port: number, isWatch: boolean, delayMs: number, resources: string[]): void {
  console.log('\n' + sectionHeader('SERVER READY'));
  
  console.log(renderConfigPanel({ 
    file, 
    port: String(port), 
    delay: String(delayMs), 
    watch: isWatch 
  }) + '\n');

  console.log(sectionHeader('AVAILABLE RESOURCES'));
  
  const base = `http://localhost:${port}`;
  
  const get = getMonochromeBadge('GET');
  const post = getMonochromeBadge('POST');
  const put = getMonochromeBadge('PUT');
  const patch = getMonochromeBadge('PATCH');
  const del = getMonochromeBadge('DELETE');

  for (const resource of resources) {
    console.log(pc.bold(pc.white(`■ /${resource}`)));
    
    const methodsLeft1 = `  ${get}  ${post}`;
    const methodsLeft2 = `  ${get}  ${put}  ${patch}  ${del}`;
    
    // Align URLs at column 45
    const pad1 = ' '.repeat(Math.max(1, 45 - stripAnsi(methodsLeft1).length));
    const pad2 = ' '.repeat(Math.max(1, 45 - stripAnsi(methodsLeft2).length));
    
    console.log(`${methodsLeft1}${pad1}${pc.white(`${base}/${resource}`)}`);
    console.log(`${methodsLeft2}${pad2}${pc.white(`${base}/${resource}/:id`)}\n`);
  }
  
  console.log(sectionHeader('REQUEST LOGS'));
  console.log(`${pc.green('✓')} ${pc.dim('Ready on')} ${pc.white(`${base}`)}\n`);
}