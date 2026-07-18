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

import { readFileSync, writeFileSync } from "node:fs";

const latestModulePath = join(binDir, latestVersion.name, "index.js");
const latestModule = await import(pathToFileURL(latestModulePath).href);

// Auto-export synchronization
const exportKeys = Object.keys(latestModule).filter(key => key !== "default").sort();
const currentFile = fileURLToPath(import.meta.url);
const currentContent = readFileSync(currentFile, "utf-8");

const expectedExportLine = `export const { ${exportKeys.join(", ")} } = latestModule;`;
const regex = /export const \{[^}]*\}\s*=\s*latestModule;/;

const match = currentContent.match(regex);
if (!match || match[0] !== expectedExportLine) {
    let newContent;
    if (match) {
        newContent = currentContent.replace(regex, expectedExportLine);
    } else {
        newContent = currentContent.trimEnd() + `\n\n${expectedExportLine}\n`;
    }
    writeFileSync(currentFile, newContent, "utf-8");
    console.log(`\x1b[32m[kschema-fs-read-config] Automatically updated root index.js exports to match ${latestVersion.name}: [${exportKeys.join(", ")}]\x1b[0m`);
    console.log(`\x1b[33mPlease re-run your command.\x1b[0m`);
    process.exit(0);
}

export { latestModule };

export const { getAllFilesContent, getDataPath, getPort, getSchemasPath, getTableNames } = latestModule;


