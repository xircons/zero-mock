import pc from 'picocolors';
import fs from 'fs';
import path from 'path';

export type ErrorCode = 
  | 'FILE_NOT_FOUND' 
  | 'FILE_NOT_JSON' 
  | 'FILE_UNREADABLE' 
  | 'JSON_INVALID' 
  | 'JSON_NOT_OBJECT' 
  | 'JSON_EMPTY' 
  | 'PORT_IN_USE' 
  | 'PORT_INVALID' 
  | 'PORT_PRIVILEGED' 
  | 'LOCK_STALE' 
  | 'LOCK_CONFLICT' 
  | 'LOCK_WRITE_FAILED' 
  | 'WATCH_FAILED' 
  | 'WATCH_RELOAD_FAILED' 
  | 'SERVER_CRASH' 
  | 'UNKNOWN';

const ERROR_MESSAGES: Record<ErrorCode, { msg: string; hint: string }> = {
  FILE_NOT_FOUND: { msg: 'Target JSON file not found.', hint: 'Check if the file path is correct.' },
  FILE_NOT_JSON: { msg: 'Target file is not a JSON file.', hint: 'Ensure the file ends with .json.' },
  FILE_UNREADABLE: { msg: 'Cannot read the target file.', hint: 'Check file permissions.' },
  JSON_INVALID: { msg: 'Invalid JSON format.', hint: 'Check the file for syntax errors.' },
  JSON_NOT_OBJECT: { msg: 'JSON root is not an object.', hint: 'The JSON file must have an object at its root.' },
  JSON_EMPTY: { msg: 'JSON file is empty.', hint: 'The API will start with no resources. Add arrays to the root object.' },
  PORT_IN_USE: { msg: 'Port is already in use.', hint: 'Choose a different port or kill the process using it.' },
  PORT_INVALID: { msg: 'Invalid port number.', hint: 'Port must be an integer between 1024 and 65535.' },
  PORT_PRIVILEGED: { msg: 'Port requires root privileges.', hint: 'Use a port number >= 1024.' },
  LOCK_STALE: { msg: 'Found a stale lock file.', hint: 'The lock file will be automatically removed.' },
  LOCK_CONFLICT: { msg: 'Another instance is running.', hint: 'Stop the other zero-mock instance or use a different file.' },
  LOCK_WRITE_FAILED: { msg: 'Failed to write lock file.', hint: 'Check directory permissions.' },
  WATCH_FAILED: { msg: 'File watcher failed to start.', hint: 'Hot-reloading will not work. Check OS file watch limits.' },
  WATCH_RELOAD_FAILED: { msg: 'Failed to reload JSON file.', hint: 'Fix the JSON syntax error. Serving last good snapshot.' },
  SERVER_CRASH: { msg: 'Server crashed unexpectedly.', hint: 'Check the error details below.' },
  UNKNOWN: { msg: 'An unknown error occurred.', hint: 'Please report this issue.' },
};

function formatErrorBlock(type: 'ERROR' | 'WARN', code: ErrorCode, detail?: string) {
  const badge = type === 'ERROR' 
    ? pc.red(pc.bold(pc.inverse(' ERROR '))) 
    : pc.yellow(pc.bold(pc.inverse(' WARN  ')));
    
  const { msg, hint } = ERROR_MESSAGES[code];
  
  let out = `\n  ${badge}  ${pc.bold(pc.white(msg))}\n`;
  if (detail) {
    out += `  ${pc.dim('│')}  ${pc.dim(detail)}\n`;
  }
  out += `  ${pc.dim('╰─')}  ${pc.blue(hint)}\n`;
  
  return out;
}

export function printError(code: ErrorCode, detail?: string): void {
  console.error(formatErrorBlock('WARN', code, detail));
}

export function printFatal(code: ErrorCode, detail?: string): never {
  console.error(formatErrorBlock('ERROR', code, detail));
  process.exit(1);
}

export function validateConfig(file: string, port: number): void {
  if (path.extname(file) !== '.json') {
    printFatal('FILE_NOT_JSON', `Path: ${file}`);
  }
  if (!fs.existsSync(file)) {
    printFatal('FILE_NOT_FOUND', `Path: ${file}`);
  }
  try {
    fs.accessSync(file, fs.constants.R_OK);
  } catch (e: any) {
    printFatal('FILE_UNREADABLE', e.message);
  }
  
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    printFatal('PORT_INVALID', `Given: ${port}`);
  }
  if (port < 1024) {
    printFatal('PORT_PRIVILEGED', `Given: ${port}`);
  }
}

export function acquireLock(file: string): void {
  const lockFilePath = `${file}.zero-mock.lock`;
  
  if (fs.existsSync(lockFilePath)) {
    try {
      const lockData = fs.readFileSync(lockFilePath, 'utf8');
      const { pid, startedAt } = JSON.parse(lockData);
      
      try {
        process.kill(pid, 0); // test liveness
        // Alive
        printFatal('LOCK_CONFLICT', `PID ${pid} since ${startedAt}`);
      } catch (e: any) {
        if (e.code === 'ESRCH') {
          // Stale
          printError('LOCK_STALE', `PID ${pid} is dead.`);
          fs.unlinkSync(lockFilePath);
        } else {
          // No permission or other error
          printFatal('LOCK_CONFLICT', `Unable to check PID ${pid}.`);
        }
      }
    } catch (e: any) {
      // Unreadable or invalid lock file format
      printError('LOCK_STALE', `Invalid lock file format.`);
      fs.unlinkSync(lockFilePath);
    }
  }

  try {
    fs.writeFileSync(lockFilePath, JSON.stringify({
      pid: process.pid,
      startedAt: new Date().toISOString()
    }), { flag: 'wx' });
  } catch (e: any) {
    if (e.code === 'EEXIST') {
      printFatal('LOCK_CONFLICT', 'Lock file appeared during race condition.');
    } else {
      printFatal('LOCK_WRITE_FAILED', e.message);
    }
  }

  const cleanup = () => {
    try {
      if (fs.existsSync(lockFilePath)) {
        fs.unlinkSync(lockFilePath);
      }
    } catch (_) { /* ignore cleanup errors */ }
  };
  
  process.on('exit', cleanup);
  process.on('SIGINT', () => { cleanup(); process.exit(130); });
  process.on('SIGTERM', () => { cleanup(); process.exit(143); });
  process.on('uncaughtException', (err) => {
    cleanup();
    printFatal('SERVER_CRASH', err.message);
  });
}
