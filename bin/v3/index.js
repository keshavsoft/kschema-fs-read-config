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

    return allJsonData.map(element => {
        return {
            name: element.fileName,
            tableName: element.content.tableName
        };
    });
};


const hello = () => {
    console.log("hello from bin v3");
};

export { getAllFilesContent, getTableNames, hello };