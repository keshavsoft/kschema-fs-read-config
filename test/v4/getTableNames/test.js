import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { getTableNames } from "../../../index.js";

const allJsonData = getTableNames({
    rootPath: __dirname
});

console.log(allJsonData);