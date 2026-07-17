import headerConfig from "./headers.json" with { type: "json" };

const buildHeader = async () => {
    await window.KSHeader(headerConfig);
};

export { buildHeader };