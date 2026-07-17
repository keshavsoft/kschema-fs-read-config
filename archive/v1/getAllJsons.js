import fs from "node:fs";
import path from "node:path";

function getJsonFiles(dirPath) {
    // Read all files and folders recursively
    const files = fs.readdirSync(dirPath, { recursive: true });

    // Filter out only files ending with '.json' and turn them into full paths
    return files
        .filter(file => path.extname(file) === '.json')
        .map(file => path.join(dirPath, file));
};

function getJsonFilesNeeded(dirPath) {
    // Read all files and folders recursively
    const files = fs.readdirSync(dirPath, { recursive: true });

    // Filter out only files ending with '.json' and turn them into full paths
    return files
        .filter(file =>
            path.basename(file) === "showAll.json" &&
            path.basename(path.dirname(file)).toLowerCase() === "configs"
        )
        .map(file => path.join(dirPath, file));
};

export { getJsonFiles, getJsonFilesNeeded };