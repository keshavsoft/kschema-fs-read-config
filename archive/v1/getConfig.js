import fs from "fs";
import path from "path";

const startFunc = ({ configPath }) => {
    const schemaPath = configPath;

    if (!fs.existsSync(schemaPath)) return "{}";

    const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));

    return schema.columnsConfig;
};

export default startFunc;