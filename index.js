import { existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));
const binDir = join(rootDir, "bin");

const latestVersion = readdirSync(binDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^v\d+$/.test(entry.name))
    .filter(({ name }) => existsSync(join(binDir, name, "index.js")))
    .map(({ name }) => ({ name, version: Number(name.slice(1)) }))
    .sort((a, b) => b.version - a.version)
    .at(0);

if (!latestVersion) {
    throw new Error("No versioned bin/v*/index.js entry found.");
}

const latestModule = await import(
    pathToFileURL(join(binDir, latestVersion.name, "index.js")).href
);

export default latestModule.default;
