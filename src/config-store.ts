import fs from 'fs';
import path from 'path';
import os from 'os';
import pc from 'picocolors';
import type { WizardConfig } from './cli-wizard';

export type SavedConfig = WizardConfig & {
  savedAt: string;
  useCount: number;
};

const getConfigPath = () => path.join(os.homedir(), '.config', 'zero-mock', 'config.json');

export function loadSavedConfig(): SavedConfig | null {
  try {
    const configPath = getConfigPath();
    if (!fs.existsSync(configPath)) {
      return null;
    }
    const raw = fs.readFileSync(configPath, 'utf8');
    const parsed = JSON.parse(raw);
    
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof parsed.file === 'string' &&
      typeof parsed.port === 'string' &&
      typeof parsed.delay === 'string' &&
      typeof parsed.watch === 'boolean'
    ) {
      return parsed as SavedConfig;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveConfig(config: WizardConfig, prev: SavedConfig | null): void {
  try {
    const configPath = getConfigPath();
    const configDir = path.dirname(configPath);
    
    fs.mkdirSync(configDir, { recursive: true });
    
    const savedConfig: SavedConfig = {
      ...config,
      savedAt: new Date().toISOString(),
      useCount: (prev?.useCount || 0) + 1,
    };
    
    fs.writeFileSync(configPath, JSON.stringify(savedConfig, null, 2), 'utf8');
  } catch {
    // Non-fatal, do nothing
  }
}

export function clearSavedConfig(): void {
  try {
    const configPath = getConfigPath();
    if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
      console.log(`${pc.green('✓')} Cleared saved configuration.`);
    } else {
      console.log(`${pc.dim('✕')} No saved configuration found.`);
    }
  } catch (err: any) {
    console.log(`${pc.red('✕')} Failed to clear config: ${err.message}`);
  }
  process.exit(0);
}

export function formatSavedAt(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  const mins = Math.floor(diffMs / 60000);
  if (mins < 2) return "just now";
  
  const hours = Math.floor(mins / 60);
  if (hours < 1) return `${mins}m ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 1) return `${hours}h ago`;
  
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}