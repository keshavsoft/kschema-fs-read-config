import fs from "node:fs";

function transmuteGemsWithWisdom({ gems, wisdom }) {
    gems.forEach(gemPath => {
        const rawGem = fs.readFileSync(gemPath, "utf-8");
        const parsedGem = JSON.parse(rawGem);

        parsedGem.columnsConfig = wisdom;

        fs.writeFileSync(gemPath, JSON.stringify(parsedGem), "utf-8");
    });
}

export { transmuteGemsWithWisdom };
