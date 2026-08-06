import fs from "node:fs";

function consultTheAncientScrolls({ scrollPath }) {
    if (!fs.existsSync(scrollPath)) {
        return {};
    }

    const scrollContent = fs.readFileSync(scrollPath, "utf-8");
    const decodedScroll = JSON.parse(scrollContent);

    return decodedScroll.columnsConfig || {};
}

export { consultTheAncientScrolls };
