# Zero-Mock: Project Overview

`zero-mock` is a zero-config CLI tool that generates a fully functional, persistent REST API from a JSON file.

## 🏗 Core Architecture

The project uses a modular singleton-based architecture with in-memory data strictly synchronized to a backing JSON file.

### Core Components

- **CLI Entry (`src/index.ts`)**: Harnesses `commander` to handle CLI arguments (`--file`, `--port`, `--delay`, `--watch`) and orchestrates the startup process.
- **Storage Engine (`src/store/jsonStore.ts`)**: A singleton (`JsonStore`) that manages the in-memory `JsonData`.
    - **Atomic Writes**: Uses a temp-file + rename strategy to ensure file integrity.
    - **Concurrency**: Serializes writes via a Promise chain (`saveChain`).
- **Dynamic Router (`src/server/routes/dynamicRouter.ts`)**: Dynamically registers Express routes for every key (collection) in the JSON file.
    - **REST Support**: Full CRUD (GET, POST, PUT, PATCH, DELETE).
    - **Features**: Filtering, Pagination (`_page`, `_limit`), and smart ID generation (numeric `max+1` or `UUID`).
- **Server Harness (`src/server/app.ts` & `bootstrap.ts`)**:
    - **Middleware**: Includes CORS, JSON parsing, request logging, and a custom `delayMiddleware` for simulating latency.

## 🛠 Key Workflows

### Initialization
1. CLI parses arguments.
2. `JsonStore.load(filePath)` reads and validates the JSON structure.
3. `bootstrap(port, options)` starts the Express server.
4. `buildDynamicRouter()` registers routes based on the loaded data keys.

### Data Persistence
Every mutation (POST, PUT, PATCH, DELETE) follows this flow:
1. Update the in-memory `JsonStore.getData()` collection.
2. Call `await JsonStore.save()`.
3. `JsonStore` serializes the write to disk atomically.

### Hot Reloading
When started with `--watch`, `fs.watch` monitors the source file. Any change triggers `JsonStore.load(filePath)`, updating the in-memory state without a server restart.

## 📝 Standards & Conventions
- **Type Safety**: Use explicit type guards (see `src/store/jsonStore.ts` and `src/server/routes/dynamicRouter.ts`) when dealing with user-provided JSON.
- **Persistence**: Always use `JsonStore.save()` after modifying the data returned by `JsonStore.getData()`.
- **Atomic Operations**: Ensure file operations remain atomic to prevent data corruption.
