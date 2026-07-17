import fs from "node:fs";
import path from "node:path";

function startFunc({ inFilePaths, inColumnsConfig }) {
    inFilePaths.forEach(element => {

        const schema = JSON.parse(fs.readFileSync(element, "utf-8"));
        console.log(schema);
        schema.columnsConfig = inColumnsConfig;

        fs.writeFileSync(element, JSON.stringify(schema), 'utf8');
    });
};

export default startFunc;