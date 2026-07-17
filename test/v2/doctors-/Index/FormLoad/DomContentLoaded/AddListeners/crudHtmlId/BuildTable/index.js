import { getKSTableConfig } from "./getKSTableConfig.js";
import showByPk from "./showByPk/index.js";
import editByPk from "./editByPk/index.js";
import getData from "./getData.js";

const startFunc = async () => {
    const config = await getKSTableConfig();

    // config.defaults.data = await getData();

    if (config.callbacks) {
        if (config.callbacks.table.body.show) {
            config.callbacks.table.body.show = fromLibrary => {
                showByPk(fromLibrary.item.pk);
            };
        };

        if (config.callbacks.table.body.edit) {
            config.callbacks.table.body.edit = fromLibrary => {
                editByPk(fromLibrary.item.pk);
            };
        };
    }

    ksTable1 = new window.ks.classes.compTable(config);
    ksTable1.initShowTable();
};

export default startFunc;