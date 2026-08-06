import dotenv from "dotenv";
import path from "path";
import fsParent from "node-fs-parent";

import getAllFilesContentFunc from "./getAllFilesContent.js";
import getTableNamesFunc from "./getTableNames.js";
import getPortFunc from "./getPort.js";
import getSchemasPathFunc from "./getSchemasPath.js";
import getDataPathFunc from "./getDataPath.js";

const loadEnv = (rootPath) => {
    const targetPath = rootPath || process.cwd();
    const envPath = fsParent(".env", 10, targetPath);
    const resolvedPath = envPath && envPath[0] ? envPath[0] : path.join(targetPath, ".env");

    dotenv.config({ path: resolvedPath });

    return path.dirname(resolvedPath);
};

const getAllFilesContent = (rootPath) => {
    const targetPath = loadEnv(rootPath);
    return getAllFilesContentFunc(path.join(targetPath, process.env.SchemaPath || ""));
};

const getTableNames = (rootPath) => {
    const targetPath = loadEnv(rootPath);
    return getTableNamesFunc(path.join(targetPath, process.env.SchemaPath || ""));
};

const getPort = (rootPath) => {
    loadEnv(rootPath);
    return getPortFunc();
};

const getSchemasPath = (rootPath) => {
    loadEnv(rootPath);
    return getSchemasPathFunc();
};

const getDataPath = (rootPath) => {
    loadEnv(rootPath);
    return getDataPathFunc();
};

export {
    getAllFilesContent, getTableNames, getPort,
    getSchemasPath, getDataPath
};