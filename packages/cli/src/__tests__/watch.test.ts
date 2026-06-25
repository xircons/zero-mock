import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { JsonStore } from '../store/jsonStore';
import { buildDynamicRouter } from '../server/routes/dynamicRouter';

// The tests interrogate Express router internals, which aren't fully typed.
function getResourceGetHandler(router: any): (req: any, res: any, next: any) => Promise<void> {
  const layer = router.stack.find(
    (l: any) => l.route && l.route.path === '/:resource' && l.route.methods.get,
  );
  expect(layer).toBeDefined();
  return layer.route.stack[0].handle;
}

describe('Watch Mode and Dynamic Routing', () => {
  const tempFile = path.resolve(__dirname, 'temp-watch-db.json');

  beforeAll(() => {
    fs.writeFileSync(tempFile, JSON.stringify({
      posts: [{ id: 1, title: 'Original Title' }]
    }));
  });

  afterAll(() => {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  });

  it('should load initial data and dynamically serve it', async () => {
    await JsonStore.load(tempFile);
    expect(JsonStore.getData().posts).toEqual([{ id: 1, title: 'Original Title' }]);

    const router = buildDynamicRouter();
    const handler = getResourceGetHandler(router);

    let jsonResponse: any = null;
    const req = {
      params: { resource: 'posts' },
      query: {}
    } as any;
    const res = {
      setHeader: () => {},
      json: (data: any) => {
        jsonResponse = data;
      }
    } as any;

    await handler(req, res, () => {});

    expect(jsonResponse).toEqual([{ id: 1, title: 'Original Title' }]);
  });

  it('should reflect updates to existing resources dynamically without recreating router', async () => {
    fs.writeFileSync(tempFile, JSON.stringify({
      posts: [{ id: 1, title: 'Updated Title' }]
    }));

    await JsonStore.load(tempFile, true);

    const router = buildDynamicRouter();
    const handler = getResourceGetHandler(router);

    let jsonResponse: any = null;
    const req = {
      params: { resource: 'posts' },
      query: {}
    } as any;
    const res = {
      setHeader: () => {},
      json: (data: any) => {
        jsonResponse = data;
      }
    } as any;

    await handler(req, res, () => {});
    expect(jsonResponse).toEqual([{ id: 1, title: 'Updated Title' }]);
  });

  it('should dynamically serve newly added resources without recreating router', async () => {
    fs.writeFileSync(tempFile, JSON.stringify({
      posts: [{ id: 1, title: 'Updated Title' }],
      comments: [{ id: 1, body: 'New Comment' }]
    }));

    await JsonStore.load(tempFile, true);

    const router = buildDynamicRouter();
    const handler = getResourceGetHandler(router);

    let postsResponse: any = null;
    const reqPosts = { params: { resource: 'posts' }, query: {} } as any;
    const resPosts = {
      setHeader: () => {},
      json: (data: any) => { postsResponse = data; }
    } as any;
    await handler(reqPosts, resPosts, () => {});
    expect(postsResponse).toEqual([{ id: 1, title: 'Updated Title' }]);

    let commentsResponse: any = null;
    const reqComments = { params: { resource: 'comments' }, query: {} } as any;
    const resComments = {
      setHeader: () => {},
      json: (data: any) => { commentsResponse = data; }
    } as any;
    
    let nextCalled = false;
    await handler(reqComments, resComments, () => { nextCalled = true; });
    
    expect(nextCalled).toBe(false);
    expect(commentsResponse).toEqual([{ id: 1, body: 'New Comment' }]);
  });

  it('should fall through to next() for non-existent resources', async () => {
    const router = buildDynamicRouter();
    const handler = getResourceGetHandler(router);

    const req = { params: { resource: 'nonexistent' }, query: {} } as any;
    const res = {
      setHeader: () => {},
      json: () => { throw new Error('Should not call json()'); }
    } as any;

    let nextCalled = false;
    await handler(req, res, () => {
      nextCalled = true;
    });

    expect(nextCalled).toBe(true);
  });
});
