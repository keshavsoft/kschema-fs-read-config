import hideUserMenu from "./hideUserMenu.js";
import resetUserHeader from "./resetUserHeader.js";
import showLoginMenu from "./showLoginMenu.js";

const applyLoggedOutMenu = () => {
    hideUserMenu();
    showLoginMenu();
    resetUserHeader();
};

export default applyLoggedOutMenu;
