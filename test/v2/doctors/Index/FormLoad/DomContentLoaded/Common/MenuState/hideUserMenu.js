const hideUserMenu = () => {
    document
        .getElementById("UserHeaderHtmlId")
        .closest("li")
        .style.display = "none";
};

export default hideUserMenu;
