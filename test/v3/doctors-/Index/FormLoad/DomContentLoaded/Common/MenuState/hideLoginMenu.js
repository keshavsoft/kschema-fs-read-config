const hideLoginMenu = () => {
    document
        .getElementById("loginHeaderHtmlId")
        .closest("li")
        .style.display = "none";
};

export default hideLoginMenu;
