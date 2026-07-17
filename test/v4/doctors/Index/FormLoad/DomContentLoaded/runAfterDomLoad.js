import { buildHeader } from "./buildHeader.js";
import addListeners from "./AddListeners/addListeners.js";

const runAfterDomLoad = () => {
    import("../../../script.js").then(fromPromise => {

        buildHeader().then(fromPromise => {
            addListeners();
        });

    });
};

export { runAfterDomLoad };
