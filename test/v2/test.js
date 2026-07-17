import { getAllFilesContent } from "../../index.js";

const allJsonData = getAllFilesContent({
    rootPath: process.cwd()
});

allJsonData.forEach((schema) => {
    console.log(schema.fileName, schema.content);
});