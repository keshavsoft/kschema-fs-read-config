import path from "path";
import load from "../../../index.js";

load({
    toPath: process.cwd(),
    toConfigPath: path.join(process.cwd(), "Config", "Schemas", "journals.json"),
    showLog: true,
    inPort: 2232
});