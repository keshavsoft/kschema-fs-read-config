import dotenv from "dotenv";
import path from "path";

import readAllJsonFilesSync from "./getConfig.js";

const getAllFilesContent = (rootPath) => {
    dotenv.config({
        path: path.join(rootPath, ".env")
    });

    const schemaPath = path.join(rootPath, process.env.SchemaPath);
    const allJsonData = readAllJsonFilesSync(schemaPath);

    return allJsonData;

};

const getTableNames = (rootPath) => {
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

const getPort = (rootPath) => {
    dotenv.config({
        path: path.join(rootPath, ".env")
    });

    return process.env.PORT;
};

const getSchemasPath = (rootPath) => {
    dotenv.config({
        path: path.join(rootPath, ".env")
    });

    return process.env.SchemaPath;
};

const getDataPath = (rootPath) => {
    dotenv.config({
        path: path.join(rootPath, ".env")
    });

    return process.env.DataPath;
};

export {
    getAllFilesContent, getTableNames, getPort,
    getSchemasPath, getDataPath
};