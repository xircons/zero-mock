import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { JsonStore } from '../store/jsonStore';

// Isolated in its own file so the JsonStore singleton starts with a clean
// (unset) self-write window.
describe('Self-write suppression', () => {
  const tempFile = path.resolve(__dirname, 'temp-selfwrite-db.json');

  beforeAll(() => {
    fs.writeFileSync(tempFile, JSON.stringify({ posts: [{ id: 1 }] }));
  });

  afterAll(() => {
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  });

  it('marks recent saves as self-caused so the watcher ignores them', async () => {
    await JsonStore.load(tempFile);
    expect(JsonStore.isSelfWrite()).toBe(false);

    JsonStore.getData().posts.push({ id: 2 });
    await JsonStore.save();

    // Immediately after save(), a file event would be ours — must be suppressed.
    expect(JsonStore.isSelfWrite()).toBe(true);
  });
});
