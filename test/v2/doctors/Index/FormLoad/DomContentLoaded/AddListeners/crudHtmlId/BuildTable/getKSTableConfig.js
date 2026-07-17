import configJson from "./configs/billShow.json" with { type: "json" };

export const getKSTableConfig = async () => {
    return structuredClone(configJson);
};