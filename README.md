# Frontend Consumer Test

This branch tests `zero-mock` as an end-user using the published npm package.

## How to run

1. **Install the CLI globally (or run via npx):**
   ```bash
   npm install -g @xirconsss/zero-mock
   ```

2. **Start the mock server:**
   ```bash
   npx @xirconsss/zero-mock -- --file ./data.json --port 3000
   ```

   With simulated delay (2s) and watch, use **long flags** so `npx`/`npm` never treats `-d` as its own debug flag:

   ```bash
   npx @xirconsss/zero-mock -- --file ./data.json --port 3000 --delay 2000 --watch
   ```

   If you still see `required option '-f, --file' not specified`, use **`npm exec`** instead:

   ```bash
   npm exec -- @xirconsss/zero-mock -- --file ./data.json --port 3000 --delay 2000
   ```

   Or install globally and avoid `npx` parsing entirely:

   ```bash
   zero-mock --file ./data.json --port 3000 --delay 2000
   ```

3. **Run the Frontend:**
   Simply open `index.html` in your browser.

