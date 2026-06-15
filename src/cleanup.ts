import fs from 'fs';
import { printFatal } from './errors';

const activeLocks = new Set<string>();
const cleanupTasks = new Set<() => void>();

export function registerLock(lockFilePath: string): void {
  activeLocks.add(lockFilePath);
}

export function releaseLock(lockFilePath: string): void {
  activeLocks.delete(lockFilePath);
  try {
    if (fs.existsSync(lockFilePath)) {
      fs.unlinkSync(lockFilePath);
    }
  } catch (_) {
    // Ignore cleanup errors
  }
}

export function registerCleanupTask(task: () => void): void {
  cleanupTasks.add(task);
}

function runCleanup() {
  for (const lockFilePath of activeLocks) {
    try {
      if (fs.existsSync(lockFilePath)) {
        fs.unlinkSync(lockFilePath);
      }
    } catch (_) {
      // Ignore cleanup errors
    }
  }
  activeLocks.clear();

  for (const task of cleanupTasks) {
    try {
      task();
    } catch (_) {
      // Ignore cleanup task errors
    }
  }
  cleanupTasks.clear();
}

// Module load time registry
process.on('exit', runCleanup);
process.on('SIGINT', () => { runCleanup(); process.exit(0); });
process.on('SIGTERM', () => { runCleanup(); process.exit(0); });
process.on('SIGHUP', () => { runCleanup(); process.exit(0); });
process.on('uncaughtException', (err) => {
  console.error(err);
  runCleanup();
  printFatal('SERVER_CRASH', err.message);
});
