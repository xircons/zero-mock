import { select, input, confirm } from '@inquirer/prompts';
import pc from 'picocolors';
import { loadSavedConfig, saveConfig, formatSavedAt, SavedConfig } from './config-store';

export const PANEL_W = 42;

export function stripAnsi(s: string): string {
  return s.replace(/\x1B\[[0-9;]*[mGKHF]/g, '');
}

export function centerPad(text: string, width = 42): string {
  const stripped = stripAnsi(text);
  const padding = Math.max(0, Math.floor((width - stripped.length) / 2));
  return ' '.repeat(padding) + text;
}

export function sectionHeader(title: string): string {
  const header = `${pc.blue('◆')} ${pc.bold(pc.white(title))}`;
  const rule = pc.dim('─'.repeat(PANEL_W));
  return `${header}\n${rule}`;
}

export type WizardConfig = {
  file: string;
  port: string;
  delay: string;
  watch: boolean;
};

export function renderConfigPanel(config: WizardConfig, saved?: SavedConfig | null): string {
  let out = pc.dim('╭' + '─'.repeat(PANEL_W) + '╮\n');

  const rows = [
    { label: 'Target File', value: config.file },
    { label: 'Default Port', value: config.port },
    { label: 'Latency', value: `${config.delay}ms` },
    { label: 'Watch Mode', value: config.watch ? 'Active' : 'Inactive' },
  ];

  for (const row of rows) {
    const labelPadded = ` · ${row.label} `.padEnd(20, ' ');
    const valRaw = row.value;
    const spaceCount = Math.max(0, PANEL_W - labelPadded.length - valRaw.length - 3);
    const spaces = ' '.repeat(spaceCount);
    
    out += pc.dim('│') + pc.dim(labelPadded) + pc.white(row.value) + spaces + ' ' + pc.green('✓') + ' ' + pc.dim('│') + '\n';
  }
  
  if (saved) {
    out += pc.dim('├' + '─'.repeat(PANEL_W) + '┤\n');
    const footerText = `last used ${formatSavedAt(saved.savedAt)}`;
    const footerPadded = ` · ${footerText} `.padEnd(PANEL_W, ' ');
    out += pc.dim('│') + pc.dim(footerPadded) + pc.dim('│') + '\n';
  }

  out += pc.dim('╰' + '─'.repeat(PANEL_W) + '╯');
  return out;
}

const hex = (hexCode: string, text: string) => {
  const r = parseInt(hexCode.slice(1, 3), 16);
  const g = parseInt(hexCode.slice(3, 5), 16);
  const b = parseInt(hexCode.slice(5, 7), 16);
  return `\x1b[38;2;${r};${g};${b}m${text}\x1b[39m`;
};

const FALLBACK: WizardConfig = {
  file: './example/db.json',
  port: '8080',
  delay: '200',
  watch: true,
};

export async function runWizard(): Promise<WizardConfig> {
  console.clear();
  
  const saved = loadSavedConfig();
  const defaults = saved ?? FALLBACK;
  const isReturning = saved !== null;

  const logoTop =    hex('#bfdbfe', '  ▗▄▄▄▄▖▗▄▄▄▖▗▄▄▖  ▗▄▖ ▗▖  ▗▖ ▗▄▖  ▗▄▄▖▗▖ ▗▖');
  const logoMid1 =   hex('#60a5fa', '     ▗▞▘▐▌   ▐▌ ▐▌▐▌ ▐▌▐▛▚▞▜▌▐▌ ▐▌▐▌   ▐▌▗▞▘');
  const logoMid2 =   hex('#2563eb', '   ▗▞▘  ▐▛▀▀▘▐▛▀▚▖▐▌ ▐▌▐▌  ▐▌▐▌ ▐▌▐▌   ▐▛▚▖ ');
  const logoBottom = hex('#1e3a8a', '  ▐▙▄▄▄▖▐▙▄▄▖▐▌ ▐▌▝▚▄▞▘▐▌  ▐▌▝▚▄▞▘▝▚▄▄▖▐▌ ▐▌');

  console.log(`\n${logoTop}\n${logoMid1}\n${logoMid2}\n${logoBottom}\n`);
  
  console.log(centerPad(pc.bold(pc.white("Zero-Mock By Xircons"))));
  console.log(centerPad(pc.dim("Zero-config REST API setup in seconds")));
  
  if (isReturning && saved) {
    console.log(centerPad(pc.dim(`last session ${formatSavedAt(saved.savedAt)}`)));
  }

  console.log('\n' + renderConfigPanel(defaults, saved) + '\n');

  const promptTheme = { prefix: pc.blue('◆') };

  const choice = await select({
    message: 'What would you like to do?',
    theme: promptTheme,
    choices: [
      { name: `${pc.green('▶')}  Continue`, value: 'continue', short: 'Continue' },
      { name: `${pc.yellow('◈')}  Change configuration (pick manually)`, value: 'change', short: 'Change configuration' },
      { name: `${pc.dim('✕')}  Cancel (exit wizard)`, value: 'cancel', short: 'Cancel' },
    ],
  });

  if (choice === 'cancel') {
    console.clear();
    console.log(pc.dim('Setup cancelled. zero-mock aborted.'));
    process.exit(0);
  }

  if (choice === 'continue') {
    console.clear();
    saveConfig(defaults, saved);
    return defaults;
  }

  // Change configuration
  console.clear();
  console.log('\n' + sectionHeader('CUSTOM CONFIGURATION'));
  
  if (isReturning) {
    console.log(pc.dim('Pre-filled from last session — press Enter to keep\n'));
  }

  const file = await input({
    message: 'Target File Path:',
    default: defaults.file,
    theme: promptTheme,
    validate: (value) => {
      if (!value.trim()) return "File path cannot be empty.";
      if (!value.endsWith('.json')) return "File must be a JSON file (.json).";
      return true;
    }
  });

  const port = await input({
    message: 'Port Number:',
    default: defaults.port,
    theme: promptTheme,
    validate: (value) => {
      const p = parseInt(value, 10);
      if (isNaN(p) || p < 1 || p > 65535) return "Port must be a number between 1 and 65535.";
      return true;
    }
  });

  const delay = await input({
    message: 'Simulated Latency (ms):',
    default: defaults.delay,
    theme: promptTheme,
    validate: (value) => {
      const d = parseInt(value, 10);
      if (isNaN(d) || d < 0) return "Latency must be a non-negative integer.";
      return true;
    }
  });

  const watch = await confirm({
    message: 'Enable Watch Mode (auto-reload on save)?',
    default: defaults.watch,
    theme: promptTheme,
  });

  const newConfig = { file, port, delay, watch };
  saveConfig(newConfig, saved);

  console.log(`\n  ${pc.green('✓')} Configuration updated.`);
  console.clear();

  return newConfig;
}