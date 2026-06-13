import { select, input, confirm } from '@inquirer/prompts';
import gradient from 'gradient-string';
import pc from 'picocolors';

export type WizardConfig = {
  file: string;
  port: string;
  delay: string;
  watch: boolean;
};

// Logo width is approx 44 characters
const centerPad = (text: string, width = 44) => {
  const padding = Math.max(0, Math.floor((width - text.length) / 2));
  return ' '.repeat(padding) + text;
};

export async function runWizard(): Promise<WizardConfig> {
  console.clear();

  const logo = `
▗▄▄▄▄▖▗▄▄▄▖▗▄▄▖  ▗▄▖ ▗▖  ▗▖ ▗▄▖  ▗▄▄▖▗▖ ▗▖
   ▗▞▘▐▌   ▐▌ ▐▌▐▌ ▐▌▐▛▚▞▜▌▐▌ ▐▌▐▌   ▐▌▗▞▘
 ▗▞▘  ▐▛▀▀▘▐▛▀▚▖▐▌ ▐▌▐▌  ▐▌▐▌ ▐▌▐▌   ▐▛▚▖ 
▐▙▄▄▄▖▐▙▄▄▖▐▌ ▐▌▝▚▄▞▘▐▌  ▐▌▝▚▄▞▘▝▚▄▄▖▐▌ ▐▌
`;

  console.log(gradient(['#020617', '#1e3a8a', '#3b82f6'])(logo));
  console.log(centerPad(pc.bold(pc.white("Zero-Mock By xirconsss"))));
  console.log(centerPad(pc.dim("Zero-config REST API setup in seconds")));
  console.log(centerPad(pc.dim("Creates the local server, mounts the JSON, and simulates latency.\n"), 66)); // wider line

  console.log(`  Target File ./example/db.json ${pc.dim('[✔]')}`);
  console.log(`  Default Port 8080 ${pc.dim('[✔]')}`);
  console.log(`  Latency 200ms (Realistic) ${pc.dim('[✔]')}`);
  console.log(`  Watch Mode Active ${pc.dim('[✔]')}\n`);

  const choice = await select({
    message: 'What would you like to do?',
    choices: [
      { name: 'Continue', value: 'continue' },
      { name: 'Change configuration (pick manually)', value: 'change' },
      { name: 'Cancel (exit wizard)', value: 'cancel' },
    ],
  });

  if (choice === 'cancel') {
    console.clear();
    console.log(pc.dim('■ Setup cancelled. zero-mock aborted.'));
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
  console.log(`  ${pc.bold(pc.white('CUSTOM CONFIGURATION'))}`);
  console.log(pc.dim('  ─────────────────────────────────────────────────────────────'));

  const file = await input({
    message: 'Target File Path:',
    default: './example/db.json',
  });

  const port = await input({
    message: 'Port Number:',
    default: '8080',
  });

  const delay = await input({
    message: 'Simulated Latency (ms):',
    default: '200',
  });

  const watch = await confirm({
    message: 'Enable Watch Mode (auto-reload on save)?',
    default: true,
  });

  console.log(`\n  ${pc.dim('[✔]')} Configuration updated.`);
  console.clear();

  return { file, port, delay, watch };
}