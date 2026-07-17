import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.join(__dirname, "package.json");

if (!fs.existsSync(packageJsonPath)) {
    console.error("package.json not found!");
    process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const packageName = packageJson.name;
const localVersion = packageJson.version;

if (!packageName || !localVersion) {
    console.error("Package name or version is missing in package.json!");
    process.exit(1);
}

console.log(`Local version: ${localVersion}`);

let publishedVersion = "0.0.0";
try {
    const stdout = execSync(`npm view ${packageName} version`, { stdio: ["pipe", "pipe", "ignore"] });
    publishedVersion = stdout.toString().trim();
    console.log(`Published version on npm: ${publishedVersion}`);
} catch (error) {
    console.log(`Could not find package ${packageName} on npm registry (assuming 0.0.0).`);
}

function parseVersion(v) {
    return v.replace(/^v/, "").split(".").map(Number);
}

function isLocalVersionGreater(local, published) {
    const [lMajor, lMinor, lPatch] = parseVersion(local);
    const [pMajor, pMinor, pPatch] = parseVersion(published);

    if (lMajor !== pMajor) return lMajor > pMajor;
    if (lMinor !== pMinor) return lMinor > pMinor;
    return lPatch > pPatch;
}

if (isLocalVersionGreater(localVersion, publishedVersion)) {
    console.log(`Local version ${localVersion} is newer than published version ${publishedVersion}. Publishing...`);
    try {
        execSync("npm publish", { stdio: "inherit" });
        console.log("Successfully published to npm!");
    } catch (publishError) {
        console.error("Failed to publish:", publishError.message);
        process.exit(1);
    }
} else {
    console.log(`[SKIPPED] Local version ${localVersion} is not newer than published version ${publishedVersion}.`);
}
