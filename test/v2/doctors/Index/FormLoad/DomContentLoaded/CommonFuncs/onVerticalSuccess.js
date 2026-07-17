const startFunc = (inResponseStatus) => {
    // console.log("aaaaaaaaaa");
    clickButtonById("ShowAllHtmlId");
};

const clickButtonById = (buttonId) => {
    const localButton = document.getElementById(buttonId);

    if (localButton) {
        localButton.click();
    }
};

export default startFunc;