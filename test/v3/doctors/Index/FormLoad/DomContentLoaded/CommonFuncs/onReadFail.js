const startFunc = (inResponseStatus) => {
    const loginModal =
        document.getElementById("loginModal");

    loginModal.classList.remove("hidden");

    loginModal.querySelector("input").focus();
};

export default startFunc;