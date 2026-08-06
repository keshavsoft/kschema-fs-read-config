import fs from "fs";
import path from "path";

function readAllJsonFilesSync(dirPath) {
    try {
        // Read directory content and filter out non-JSON extensions
        return fs.readdirSync(dirPath)
            .filter(file => path.extname(file).toLowerCase() === '.json')
            .map(file => {
                const fullPath = path.join(dirPath, file);
                const rawContent = fs.readFileSync(fullPath, 'utf8');

                return {
                    fileName: file,
                    content: JSON.parse(rawContent)
                };
            });
    } catch (error) {
        console.error('Error scanning folder sync:', error.message);
        return [];
    }
}

export default readAllJsonFilesSync;
