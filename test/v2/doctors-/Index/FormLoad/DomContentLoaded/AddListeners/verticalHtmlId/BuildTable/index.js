import { getKSTableConfig } from "./getKSTableConfig.js";
// import getData from "./getData.js";

const afterSave = (optionsFromSave) => {
    console.log("optionsFromSave : ", optionsFromSave);

};

const startFunc = async () => {
    const config = await getKSTableConfig();

    config.callbacks.vertical.onSuccess = afterSave;

    ksVertical = new window.ks.classes.vertical(config);
    ksVertical.initCreate();
};

export default startFunc;