# zero-mock

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](tsconfig.json)
[![npm version](https://img.shields.io/npm/v/@xirconsss/zero-mock.svg)](https://www.npmjs.com/package/@xirconsss/zero-mock)

**zero-mock** is a zero-config Node.js CLI that turns any JSON file into a persistent, production-grade REST API in seconds. It includes an interactive setup wizard, a high-contrast brutalist UI, and smart schema inference with automatic validation.

Built for frontend developers and architects who need a realistic, stable backend for prototypes, demos, and integration tests without the overhead of database orchestration.

## Key Features

- **Zero-config** — your JSON file is your database and API definition.
- **Interactive wizard** — run `zero-mock` to start the setup guide.
- **Smart validation** — automatically infers Zod schemas from your data to validate `POST`, `PUT`, and `PATCH` requests.
- **Atomic and secure** — cross-platform atomic writes (Windows-safe) with file-locking to prevent data corruption.
- **Advanced REST** — supports filtering (`_gte`, `_lte`, `_like`), sorting (`_sort`, `_order`), and pagination (`_page`, `_limit`).
- **Realistic simulation** — simulate network latency and configure custom CORS origins/methods.
- **Watch mode** — hot-reloads data from disk on manual file changes without a server restart, including newly added or removed collections.
- **Session memory** — remembers your last used configuration for a faster workflow.

---

## Installation

### Global

```bash
npm install -g @xirconsss/zero-mock
```

Run the CLI as `zero-mock`.

### One-off with npx

```bash
npx @xirconsss/zero-mock
```

---

## Usage

### 1. Interactive mode (recommended)

Run the command without arguments to launch the setup wizard:

```bash
zero-mock
```

### 2. Manual CLI

Pass flags to skip the wizard:

```bash
zero-mock -f ./data.json -p 8080 -w -d 200
```

| Flag | Description |
| ---- | ----------- |
| `-f`, `--file` | Path to the source JSON file. |
| `-p`, `--port` | HTTP port (default `3000`, must be 1024–65535). |
| `-d`, `--delay` | Delay every request by X milliseconds (default `0`). |
| `-w`, `--watch` | Enable hot-reloading on manual file changes. |
| `--cors-origin` | Comma-separated allowed origins (default `*`). |
| `--cors-methods` | Comma-separated allowed HTTP methods (default `GET,HEAD,PUT,PATCH,POST,DELETE`). |
| `--cors-credentials` | Allow CORS credentials (cookies, auth headers). |
| `--reset` | Clear saved wizard configuration and exit. |

---

## Auto-generated API

The tool generates full CRUD endpoints for every top-level key in your JSON (e.g., `users`, `posts`).

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET` | `/{resource}` | List items (supports filtering, sorting, paging). |
| `POST` | `/{resource}` | Create item (auto-id + schema validation). |
| `GET` | `/{resource}/{id}` | Return a single item by `id`. |
| `PUT` | `/{resource}/{id}` | Replace item (schema validation). |
| `PATCH` | `/{resource}/{id}` | Partial update (schema validation). |
| `DELETE` | `/{resource}/{id}` | Remove item. |

Unknown routes and missing items return a JSON `404` (e.g. `{ "error": "Not found: GET /widgets" }`).

### Advanced List Features

**Filtering**

- `GET /posts?category=tech` — exact match
- `GET /posts?views_gte=100` — greater than or equal
- `GET /posts?title_like=hello` — case-insensitive search

**Sorting**

- `GET /posts?_sort=createdAt&_order=desc`

**Pagination**

- `GET /posts?_page=1&_limit=10`
- Returns an `X-Total-Count` header and a wrapped `{ data, pagination }` object.

---

## JSON Structure

The root must be an object, and every resource must be an array.

```json
{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob" }
  ]
}
```

Note: zero-mock automatically infers that `role` is an optional string based on the items above.

---

## Development

1. Clone the repo.
2. `npm install`
3. `npm run dev` (runs with `ts-node`)
4. `npm run build` (compiles to `dist/`)

---

## Publishing (Maintainers)

This project uses `semantic-release` for fully automated versioning and npm publishing.

1. Ensure your commits follow the [Conventional Commits](https://www.conventionalcommits.org/) format (e.g., `feat:`, `fix:`, `chore:`).
2. Push or open a PR against the `main` branch.
3. GitHub Actions handles testing, version bumping, changelog generation, and publishing to npm.

---

## License

© 2026 Zero-mock. All rights reserved. Licensed under the [MIT License](LICENSE).

---

## Links

- **Repository:** [github.com/xircons/zero-mock](https://github.com/xircons/zero-mock)
- **Issues:** [github.com/xircons/zero-mock/issues](https://github.com/xircons/zero-mock/issues)