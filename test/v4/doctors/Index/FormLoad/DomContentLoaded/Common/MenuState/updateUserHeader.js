import getUserCode from "../AuthCookie/getUserCode.js";

const updateUserHeader = () => {
    document
        .getElementById("UserHeaderHtmlId")
        .querySelector("span")
        .textContent = getUserCode();
};

export default updateUserHeader;
