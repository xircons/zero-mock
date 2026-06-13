import { select, input, confirm } from '@inquirer/prompts';
import gradient from 'gradient-string';
import pc from 'picocolors';

export const PANEL_W = 44;

export function stripAnsi(s: string): string {
  return s.replace(/\x1B\[[0-9;]*[mGKHF]/g, '');
}

export function centerPad(text: string, width = 44): string {
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

export function renderConfigPanel(config: WizardConfig): string {
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
    // Calculate spaces needed so that internal length is exactly PANEL_W
    // Inner length = labelPadded.length (20) + valRaw.length + spaces + " ✓ ".length (3)
    const spaceCount = Math.max(0, PANEL_W - labelPadded.length - valRaw.length - 3);
    const spaces = ' '.repeat(spaceCount);
    
    out += pc.dim('│') + pc.dim(labelPadded) + pc.white(row.value) + spaces + ' ' + pc.green('✓') + ' ' + pc.dim('│') + '\n';
  }
  
  out += pc.dim('╰' + '─'.repeat(PANEL_W) + '╯');
  return out;
}

export async function runWizard(): Promise<WizardConfig> {
  console.clear();

  const logo = `
▗▄▄▄▄▖▗▄▄▄▖▗▄▄▖  ▗▄▖ ▗▖  ▗▖ ▗▄▖  ▗▄▄▖▗▖ ▗▖
   ▗▞▘▐▌   ▐▌ ▐▌▐▌ ▐▌▐▛▚▞▜▌▐▌ ▐▌▐▌   ▐▌▗▞▘
 ▗▞▘  ▐▛▀▀▘▐▛▀▚▖▐▌ ▐▌▐▌  ▐▌▐▌ ▐▌▐▌   ▐▛▚▖ 
▐▙▄▄▄▖▐▙▄▄▖▐▌ ▐▌▝▚▄▞▘▐▌  ▐▌▝▚▄▞▘▝▚▄▄▖▐▌ ▐▌
`;

  console.log(gradient(['#1e3a8a','#2563eb','#60a5fa','#bfdbfe']).multiline(logo));
  console.log(centerPad(pc.bold(pc.white("Zero-Mock By Xircons"))));
  console.log(centerPad(pc.dim("Zero-config REST API setup in seconds")));

  console.log(renderConfigPanel({
    file: './example/db.json',
    port: '8080',
    delay: '200',
    watch: true,
  }) + '\n');

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
    return {
      file: './example/db.json',
      port: '8080',
      delay: '200',
      watch: true,
    };
  }

  // Change configuration
  console.clear();
  console.log('\n' + sectionHeader('CUSTOM CONFIGURATION'));

  const file = await input({
    message: 'Target File Path:',
    default: './example/db.json',
    theme: promptTheme,
  });

  const port = await input({
    message: 'Port Number:',
    default: '8080',
    theme: promptTheme,
  });

  const delay = await input({
    message: 'Simulated Latency (ms):',
    default: '200',
    theme: promptTheme,
  });

  const watch = await confirm({
    message: 'Enable Watch Mode (auto-reload on save)?',
    default: true,
    theme: promptTheme,
  });

  console.log(`\n  ${pc.green('✓')} Configuration updated.`);
  console.clear();

  return { file, port, delay, watch };
}