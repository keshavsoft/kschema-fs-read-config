import dotenv from "dotenv";
import path from "path";

import readAllJsonFilesSync from "./getConfig.js";

const getAllFilesContent = ({ rootPath }) => {
    dotenv.config({
        path: path.join(rootPath, ".env")
    });

    const schemaPath = path.join(rootPath, process.env.SchemaPath);
    const allJsonData = readAllJsonFilesSync(schemaPath);

    return allJsonData;

};

const getTableNames = ({ rootPath }) => {
    dotenv.config({
        path: path.join(rootPath, ".env")
    });

    const schemaPath = path.join(rootPath, process.env.SchemaPath);
    const allJsonData = readAllJsonFilesSync(schemaPath);

    return allJsonData;
    allJsonData.forEach((schema) => {
        console.log(schema.fileName, schema.content);
    });
};

export { getAllFilesContent };