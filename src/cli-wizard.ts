import { select, input, confirm } from '@inquirer/prompts';
import gradient from 'gradient-string';
import pc from 'picocolors';

export type WizardConfig = {
  file: string;
  port: string;
  delay: string;
  watch: boolean;
};

export async function runWizard(): Promise<WizardConfig> {
  console.clear();

  const logo = `
  ______ _______  ______  _____      _______  _____  _______ _     _
   ____/ |______ |_____/ |     | ___ |  |  | |     | |       |____/ 
  /_____ |______ |    \\_ |_____|     |  |  | |_____| |_____  |    \\_
`;

  console.log(gradient(['#020617', '#1e3a8a', '#3b82f6'])(logo));
  console.log("  " + pc.bold(pc.white("Zero-Mock By Xircons")));
  console.log("  " + pc.dim("Zero-config REST API setup in seconds"));
  console.log("  " + pc.dim("Creates the local server, mounts the JSON, and simulates latency.\n"));

  console.log(`  Target File ./example/db.json ${pc.green('✓')}`);
  console.log(`  Default Port 8080 ${pc.green('✓')}`);
  console.log(`  Latency 200ms (Realistic) ${pc.green('✓')}`);
  console.log(`  Watch Mode Active ${pc.green('✓')}\n`);

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
  console.log(`  ${pc.bold('CUSTOM CONFIGURATION')}`);
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

  console.log(`\n  ${pc.green('✔')} Configuration updated.`);
  console.clear();

  return { file, port, delay, watch };
}
