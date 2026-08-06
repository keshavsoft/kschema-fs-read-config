import dotenv from "dotenv";
import path from "path";
import fsParent from "node-fs-parent";

import getAllFilesContentFunc from "./getAllFilesContent.js";
import getTableNamesFunc from "./getTableNames.js";
import getPortFunc from "./getPort.js";
import getSchemasPathFunc from "./getSchemasPath.js";
import getDataPathFunc from "./getDataPath.js";

const loadEnv = (rootPath) => {
    const targetPath = rootPath ? rootPath : process.cwd();
    const envPath = fsParent(".env", 10, targetPath);

    dotenv.config({ path: envPath[0] });

    // const schemaPath = path.join(targetPath, process.env.SchemaPath);

    return targetPath;
};

const getAllFilesContent = (rootPath) => {
    dotenv.config({
        path: path.join(rootPath, ".env")
    });

    const schemaPath = path.join(rootPath, process.env.SchemaPath);
    return getAllFilesContentFunc(schemaPath);
};

const getTableNames = (rootPath) => {
    const targetPath = rootPath ? rootPath : process.cwd();
    const envPath = fsParent(".env", 10, targetPath);

    dotenv.config({ path: envPath[0] });

    const schemaPath = path.join(targetPath, process.env.SchemaPath);

    return getTableNamesFunc(schemaPath);
};

const getPort = (rootPath) => {
    dotenv.config({
        path: path.join(rootPath, ".env")
    });

    return getPortFunc();
};

const getSchemasPath = (rootPath) => {
    const targetPath = loadEnv(rootPath);

    dotenv.config({
        path: path.join(targetPath, ".env")
    });

    return getSchemasPathFunc();
};

const getDataPath = (rootPath) => {
    dotenv.config({
        path: path.join(rootPath, ".env")
    });

    return getDataPathFunc();
};

export {
    getAllFilesContent, getTableNames, getPort,
    getSchemasPath, getDataPath
};