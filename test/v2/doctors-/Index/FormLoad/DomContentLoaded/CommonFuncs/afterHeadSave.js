import onSuccessFunc from "./onSuccess.js";

const afterHeadSave = async (inPk) => {
    const config = await fetch("Index/Configs/AddItem/config.json");
    const configJson = await config.json();

    configJson.endPoints.findFromParams = configJson.endPoints.findFromParams.replace("{pk}", inPk);
    configJson.callbacks.vertical.onSuccess = onSuccessFunc;

    if (window.KSTable) {
        console.log("table loaded from cdn");

        await window.KSTable.initCreate(configJson);
    };

    const configForSubTable = await fetch("Index/Configs/AddItem/configForSubTable.json");
    const configForSubTableJson = await configForSubTable.json();

    const findColumn = configForSubTableJson.columnsConfig.find(element => {
        return element.columnName === "ParentPk";
    });

    findColumn.defaultValue = inPk.toString();
    configForSubTableJson.endPoints.read += inPk.toString();

    if (window.KSTable) {
        console.log("table loaded from cdn");

        await window.KSTable.initTableWithFooter(configForSubTableJson);
    };
};

export default afterHeadSave;