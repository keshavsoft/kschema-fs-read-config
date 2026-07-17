import path from "path";
import load from "../../index.js";

load({
    toPath: path.join(process.cwd(), "doctors"),
    configPath: path.join(process.cwd(), "Config", "Schemas", "doctors.json"),
    inAction: "Crud"
});