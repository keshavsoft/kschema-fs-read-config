import readAllJsonFilesSync from "./getConfig.js";

const getAllFilesContent = (schemaPath) => {
    const allJsonData = readAllJsonFilesSync(schemaPath);
    return allJsonData;
};

export default getAllFilesContent;
