# zero-mock

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](tsconfig.json)
[![npm version](https://img.shields.io/npm/v/@xirconsss/zero-mock.svg)](https://www.npmjs.com/package/@xirconsss/zero-mock)

**zero-mock** is a zero-config Node.js CLI that turns a JSON file into a local REST API. Point it at a file whose top-level keys are **collection names** and whose values are **arrays of records**—it serves full CRUD routes and writes changes back to disk. Built for **frontend developers** who need a quick, realistic backend for prototypes, demos, and integration tests without standing up a database or bespoke server.

## Installation

### Global

```bash
npm install -g @xirconsss/zero-mock
```

Run the CLI as **`zero-mock`** (see [Usage](#usage)).

### One-off with npx

```bash
npx @xirconsss/zero-mock -f ./data.json -p 3000
```

Flags: **`-f`** / **`--file`** (required JSON path), **`-p`** / **`--port`** (optional, default `3000`). If your shell or npm version forwards extra flags to npm instead of the CLI, insert **`--`** before **`-f`** (e.g. `npx @xirconsss/zero-mock -- -f ./data.json`).

## Quick start

From the repo root (or any directory containing the example file):

```bash
npx @xirconsss/zero-mock -f ./example/db.json -p 3000
```

In another terminal:

```bash
curl http://localhost:3000/users
curl http://localhost:3000/users/1
```

The server logs the exact URLs for each collection when it starts.

## Development

From a clone: `npm install`, then `npm run build` (or `npm run dev` with `ts-node`). Run the built CLI with `node dist/index.js -f ./example/db.json -p 3000`.

## Features

- **Zero-config** — one JSON file defines your API surface; no schemas or generators to run.
- **Full CRUD REST API** — `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` per collection, with CORS and JSON bodies enabled.
- **Atomic file persistence** — writes go through a temp file and rename, with serialized saves so concurrent requests do not corrupt the file.
- **Smart ID generation** — new rows get the next **numeric** id when existing ids are integers or all-digit strings; otherwise new ids use a **UUID**.

## Auto-generated API

Each **top-level key** in your JSON (e.g. `users`, `posts`) becomes a **resource** name. Replace `{resource}` with that key and `{id}` with a row’s `id` (string params match numeric ids loosely).

| Method   | Path                 | Description |
| -------- | -------------------- | ----------- |
| `GET`    | `/{resource}`        | List all items in the collection. |
| `POST`   | `/{resource}`        | Create an item; server assigns `id` and returns `201` with the new body. |
| `GET`    | `/{resource}/{id}`   | Return one item by `id`; `404` if missing. |
| `PUT`    | `/{resource}/{id}`   | Replace the item; `id` in the URL wins; `404` if missing. |
| `PATCH`  | `/{resource}/{id}`   | Shallow-merge fields into the item; `404` if missing. |
| `DELETE` | `/{resource}/{id}`   | Remove the item; `204` on success; `404` if missing. |

Invalid JSON bodies (non-objects for write routes) receive **`400`** with a JSON error message. Persistence failures surface as **`500`**.

## JSON file shape

The root must be a JSON **object**. Each property must be an **array** (your “tables”). Each item you want to address by URL should include an **`id`** field (number or string).

## Publishing to npm (maintainers)

1. Use an [npmjs.com](https://www.npmjs.com/) account with **2FA** enabled and permission to publish the **`@xirconsss`** scope (user or org on npm).
2. Log in locally: `npm login` (or `npm login --auth-type=web`).
3. Install deps and build: `npm install` (so `tsc` is available), then bump **`version`** in `package.json` when releasing.
4. Publish: `npm publish` (`publishConfig.access` is already `public` for this scoped package).

**GitHub Actions:** the workflow [`.github/workflows/publish-npm.yml`](.github/workflows/publish-npm.yml) runs on **workflow_dispatch** or when a **GitHub Release** is published. It uses the GitHub **Environment** named **`NPM_TOKEN`** with a secret also named **`NPM_TOKEN`** (repo → **Settings** → **Environments** → **NPM_TOKEN** → **Environment secrets**).

**Token on npm (required):**

1. Create a classic **[Automation](https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-classic-tokens)** token, **or** a **[granular access token](https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-granular-access-tokens)** with **read and write** on **`@xirconsss/zero-mock`** (and org **`xirconsss`** if npm asks).
2. For granular tokens: turn **Bypass two-factor authentication (2FA)** **on** so CI does not hit **`EOTP`**. Do **not** use **`NPM_OTP`** secrets (codes expire in ~30 seconds).
3. Paste the token into the **`NPM_TOKEN`** environment secret on GitHub, then run the workflow.

**Optional — OIDC trusted publishing:** You can later move to [npm trusted publishing](https://docs.npmjs.com/trusted-publishers) and drop the secret; if you see **`E404`** on `PUT` with OIDC, the Trusted Publisher settings on npm (repo, workflow filename, environment name) do not match this workflow—token auth avoids that until it is configured correctly.

## License

MIT - see [LICENSE](LICENSE).
## Links

- **Repository:** [github.com/xircons/zero-mock](https://github.com/xircons/zero-mock)
- **Issues:** [github.com/xircons/zero-mock/issues](https://github.com/xircons/zero-mock/issues)
