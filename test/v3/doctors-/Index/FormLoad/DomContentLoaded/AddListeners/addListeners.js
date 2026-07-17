import showAllHtmlId from "./showAllHtmlId/start.js";
import crudHtmlId from "./crudHtmlId/start.js";
import verticalHtmlId from './verticalHtmlId/start.js';

const hookAllListeners = () => {

    verticalHtmlId();
    showAllHtmlId();
    crudHtmlId();
};

export default hookAllListeners;