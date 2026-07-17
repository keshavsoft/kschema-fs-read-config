import configJson from "./configs/showAll.json" with { type: "json" };

export const getKSTableConfig = async () => {
    return structuredClone(configJson);
};