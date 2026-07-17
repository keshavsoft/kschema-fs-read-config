import buildTable from "./BuildTable/index.js";

const clickFuncToRun = ({ inCurrentTarget }) => {
    buildTable().then();
};

export default clickFuncToRun;