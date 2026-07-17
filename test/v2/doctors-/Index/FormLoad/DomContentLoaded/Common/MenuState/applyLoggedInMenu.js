import hideLoginMenu from "./hideLoginMenu.js";
import showUserMenu from "./showUserMenu.js";
import updateUserHeader from "./updateUserHeader.js";

const applyLoggedInMenu = () => {
    showUserMenu();
    hideLoginMenu();
    updateUserHeader();
};

export default applyLoggedInMenu;
