import configJson from "./configs/verticalConfig.json" with { type: "json" };

export const getKSTableConfig = async () => {
    return structuredClone(configJson);
};