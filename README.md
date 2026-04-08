# zero-mock

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](tsconfig.json)
[![npm version](https://img.shields.io/npm/v/@xirconsss/zero-mock.svg)](https://www.npmjs.com/package/@xirconsss/zero-mock)

**zero-mock** is a zero-config Node.js CLI that turns a JSON file into a local REST API. Point it at a file whose top-level keys are **collection names** and whose values are **arrays of records**—it serves full CRUD routes and writes changes back to disk. Built for **frontend developers** who need a quick, realistic backend for prototypes, demos, and integration tests without standing up a database or bespoke server.

## Demo

![Terminal demo](docs/demo.gif)

Regenerate from a `.cast` with [agg](https://github.com/asciinema/agg): `agg recording.cast docs/demo.gif`. To drop trailing frames (e.g. `^C` / `exit`), keep an early range with [gifsicle](https://www.lcdf.org/gifsicle/): `gifsicle docs/demo.gif '#0-10' -o docs/demo.gif` (adjust the end frame as needed).

## Installation

### Global

```bash
npm install -g @xirconsss/zero-mock
```

Run the CLI as **`zero-mock`** (see [Usage](#usage)).

### One-off with npx

```bash
npx @xirconsss/zero-mock -f ./example/db.json -p 3000
```

If your shell or npm version forwards extra flags to npm instead of the CLI, insert **`--`** before the first CLI flag (e.g. `npx @xirconsss/zero-mock -- -f ./data.json -p 3000 -w`).

## Usage

| Flag | Description |
| ---- | ----------- |
| **`-f` / `--file`** | Required. Path to the JSON file. |
| **`-p` / `--port`** | HTTP port (default `3000`, must be 1–65535). |
| **`-d` / `--delay`** | Optional. Delay every request by this many milliseconds. Must be a non-negative integer using digits only (default `0`). |
| **`-w` / `--watch`** | Optional. Watch the JSON file and reload the in-memory data when it changes. If a save produces invalid JSON, the server prints `[watch] Could not reload "<path>": ...` to stderr and keeps the last good data until the file is valid again. Only one reload runs at a time. When watch starts, you also get `[watch] Watching "<path>" for changes.` on stdout. |

Examples:

```bash
zero-mock -f ./data.json -p 3000 -d 200
zero-mock -f ./data.json -w
```

## Quick start

From the repo root (or any directory containing the example file):

```bash
npx @xirconsss/zero-mock -f ./example/db.json -p 3000
```

Optional:

```bash
npx @xirconsss/zero-mock -f ./example/db.json -p 3000 -d 200 -w
```

In another terminal:

```bash
curl http://localhost:3000/users
curl http://localhost:3000/users/1
```

The server logs the exact URLs for each collection when it starts.

## Development

From a clone: `npm install`, then `npm run build` (or `npm run dev` with `ts-node`). Run the built CLI with:

```bash
node dist/index.js -f ./example/db.json -p 3000
```

Add `-d` / `-w` the same way as the published CLI.

## Features

- **Zero-config** — one JSON file defines your API surface; no schemas or generators to run.
- **Full CRUD REST API** — `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` per collection, with CORS and JSON bodies enabled.
- **Atomic file persistence** — writes go through a temp file and rename, with serialized saves so concurrent requests do not corrupt the file.
- **Smart ID generation** — new rows get the next **numeric** id when existing ids are integers or all-digit strings; otherwise new ids use a **UUID**.
- **Request logging** — each finished request logs as `[METHOD] <path> - <status>` (path is Express `req.path`, no query string).
- **Optional delay** — `-d` adds a fixed pause before route handling (after JSON body parsing).
- **List filtering and pagination** — see [List GET](#list-get) on `GET /{resource}`.
- **Watch mode** — `-w` reloads data from disk on file change without restarting the process (see [Usage](#usage)).

## Auto-generated API

Each **top-level key** in your JSON (e.g. `users`, `posts`) becomes a **resource** name. Replace `{resource}` with that key and `{id}` with a row’s `id` (string params match numeric ids loosely).

| Method   | Path                 | Description |
| -------- | -------------------- | ----------- |
| `GET`    | `/{resource}`        | List items (optionally [filtered and paginated](#list-get)). |
| `POST`   | `/{resource}`        | Create an item; server assigns `id` and returns `201` with the new body. |
| `GET`    | `/{resource}/{id}`   | Return one item by `id`; `404` if missing. |
| `PUT`    | `/{resource}/{id}`   | Replace the item; `id` in the URL wins; `404` if missing. |
| `PATCH`  | `/{resource}/{id}`   | Shallow-merge fields into the item; `404` if missing. |
| `DELETE` | `/{resource}/{id}`   | Remove the item; `204` on success; `404` if missing. |

Invalid JSON bodies (non-objects for write routes) receive **`400`** with a JSON error message. Persistence failures surface as **`500`**.

### List GET

**Filtering:** Every query parameter except `_page` and `_limit` is a filter. Only plain-object rows are kept. For each filter key, the row must have that property, and the value must match the query value with loose equality (`==`). Query values are strings (first value wins if repeated). Rows missing a filter key are dropped.

**Pagination:** If **both** `_page` and `_limit` are present and are positive integers (digit strings only), the list is sliced after filtering. `_page` is 1-based. If either is missing or invalid, the full filtered list is returned (no error).

Examples using [example/db.json](example/db.json):

```bash
curl 'http://localhost:3000/users?role=admin'
curl 'http://localhost:3000/users?_page=1&_limit=2'
```

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
