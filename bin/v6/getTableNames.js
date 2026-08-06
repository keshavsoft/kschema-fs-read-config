import readAllJsonFilesSync from "./getConfig.js";

const getTableNames = (schemaPath) => {
    const allJsonData = readAllJsonFilesSync(schemaPath);
    return allJsonData.map(element => {
        return {
            name: element.fileName,
            tableName: element.content.tableName
        };
    });
};

export default getTableNames;
