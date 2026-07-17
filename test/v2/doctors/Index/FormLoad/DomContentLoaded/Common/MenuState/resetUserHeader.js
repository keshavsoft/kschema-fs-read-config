const resetUserHeader = () => {
    document
        .getElementById("UserHeaderHtmlId")
        .querySelector("span")
        .textContent = "User";
};

export default resetUserHeader;
