import fs from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const rootDir = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const binDir = join(rootDir, "bin");
const rootIndexFile = join(rootDir, "index.js");

async function syncExports() {
    try {
        const latestVersion = fs.readdirSync(binDir, { withFileTypes: true })
            .filter((entry) => entry.isDirectory() && /^v\d+$/.test(entry.name))
            .filter(({ name }) => fs.existsSync(join(binDir, name, "index.js")))
            .map(({ name }) => ({ name, version: Number(name.slice(1)) }))
            .sort((a, b) => b.version - a.version)
            .at(0);

        if (!latestVersion) {
            console.error("No versioned bin/v*/index.js entry found.");
            process.exit(1);
        }

        const latestModulePath = join(binDir, latestVersion.name, "index.js");
        const latestModule = await import(pathToFileURL(latestModulePath).href + "?t=" + Date.now());

        const exportKeys = Object.keys(latestModule).filter(key => key !== "default").sort();
        const currentContent = fs.readFileSync(rootIndexFile, "utf-8");

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
            fs.writeFileSync(rootIndexFile, newContent, "utf-8");
            console.log(`[kschema-fs-read-config] Automatically synchronized root index.js exports to match ${latestVersion.name}: [${exportKeys.join(", ")}]`);
        } else {
            console.log(`[kschema-fs-read-config] Root index.js exports are already synchronized.`);
        }
    } catch (e) {
        console.error("Failed to synchronize exports:", e);
        process.exit(1);
    }
}

syncExports();
