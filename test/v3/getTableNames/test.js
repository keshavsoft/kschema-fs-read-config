import { getTableNames } from "../../../index.js";

const allJsonData = getTableNames({
    rootPath: process.cwd()
});

console.log(allJsonData);