"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startFileWatcher = startFileWatcher;
const chokidar_1 = require("chokidar");
const jsonStore_1 = require("../store/jsonStore");

function startFileWatcher(filePath) {
    let debounceTimer = null;

    const reload = async () => {
        try {
            await jsonStore_1.JsonStore.load(filePath);
            console.log(`[watch] Reloaded "${filePath}"`);
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(`[watch] Could not reload "${filePath}": ${message}`);
        }
    };

    const watcher = chokidar_1.watch(filePath, {
        persistent: true,
        usePolling: false,
        awaitWriteFinish: {
            stabilityThreshold: 100,
            pollInterval: 50,
        },
    });

    watcher.on("change", () => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => void reload(), 100);
    });

    watcher.on("error", (err) => {
        console.error(`[watch] Watcher error: ${err.message}`);
    });

    console.log(`[watch] Watching "${filePath}" for changes.`);
}