const deleteKSTokenCookie = () => {
    document.cookie = "KSToken=; Max-Age=0; Path=/";
};

export default deleteKSTokenCookie;
