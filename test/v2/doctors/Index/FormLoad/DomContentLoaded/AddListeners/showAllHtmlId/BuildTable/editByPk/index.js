import itemsConfigJson from "./configs/itemsConfig.json" with { type: "json" };
import verticalJson from "./configs/vertical.json" with { type: "json" };

let jFLocalToInputhtmlId = (inValue) => {
    let jVarLocalHtmlId = 'htmlId';
    let jVarLocalhtmlId = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalhtmlId === null === false) {
        jVarLocalhtmlId.innerHTML = inValue;
    };
};

const itemsTableConfig = async (inPk) => {
    const configJson = structuredClone(itemsConfigJson);
    const pk = inPk;

    const findColumn = configJson.columnsConfig.find(element => {
        return element.field === "ParentPk"
    });

    findColumn.defaultValue = parseInt(pk);

    configJson.endPoints.read = configJson.endPoints.read.replace("<ParentPk>", pk);

    return configJson;
};

const getVerticalConfig = async (inPk) => {
    const pk = inPk;
    const configJson = structuredClone(verticalJson);

    configJson.endPoints.findFromParams = configJson.endPoints.findFromParams.replace("<pk>", pk);

    return configJson;
};

const startFunc = async (inPk) => {
    const pk = inPk;
    jFLocalToInputhtmlId(pk);

    const config = await getVerticalConfig(pk);

    ksVertical = new window.ks.classes.vertical(config);
    ksVertical.initCreate();

    const itemsConfig = await itemsTableConfig(pk);

    itemsConfig.callbacks.table.body.update = fromService => {
        console.log("----- : ", fromService);
    };

    ksTable1 = new window.ks.classes.compTable(itemsConfig);

    ksTable1.initShowTable();
};

export default startFunc;