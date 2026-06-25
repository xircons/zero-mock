import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { Server } from 'http';
import type { AddressInfo } from 'net';
import fs from 'fs';
import path from 'path';
import { JsonStore } from '../store/jsonStore';
import { createApp } from '../server/app';

// Exercises the real Express stack (param routes, JSON 404, store wiring) over HTTP,
// rather than poking router internals.
describe('Dynamic router integration (real HTTP)', () => {
  const tempFile = path.resolve(__dirname, 'temp-integration-db.json');
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    fs.writeFileSync(
      tempFile,
      JSON.stringify({ posts: [{ id: 1, title: 'Hello' }] }),
    );
    await JsonStore.load(tempFile);

    const app = createApp({ delayMs: 0 });
    await new Promise<void>((resolve) => {
      server = app.listen(0, resolve);
    });
    const { port } = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  });

  it('lists a collection', async () => {
    const res = await fetch(`${baseUrl}/posts`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([{ id: 1, title: 'Hello' }]);
  });

  it('gets an item by id', async () => {
    const res = await fetch(`${baseUrl}/posts/1`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: 1, title: 'Hello' });
  });

  it('returns JSON 404 for an unknown resource', async () => {
    const res = await fetch(`${baseUrl}/widgets`);
    expect(res.status).toBe(404);
    expect(res.headers.get('content-type')).toContain('application/json');
    const body = (await res.json()) as { error: string };
    expect(body.error).toContain('Not found');
  });

  it('returns JSON 404 for a known resource with a missing id', async () => {
    const res = await fetch(`${baseUrl}/posts/999`);
    expect(res.status).toBe(404);
    expect(((await res.json()) as { error: string }).error).toContain('999');
  });

  it('creates a record via POST and assigns the next id', async () => {
    const res = await fetch(`${baseUrl}/posts`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'World' }),
    });
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ id: 2, title: 'World' });
  });

  it('serves a collection added to the store after startup (no restart)', async () => {
    // Simulate a watch reload introducing a new top-level key.
    fs.writeFileSync(
      tempFile,
      JSON.stringify({
        posts: [{ id: 1, title: 'Hello' }],
        comments: [{ id: 1, body: 'Nice' }],
      }),
    );
    await JsonStore.load(tempFile, true);

    const res = await fetch(`${baseUrl}/comments`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([{ id: 1, body: 'Nice' }]);
  });
});
