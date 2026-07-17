const getTokenFromCookie = () =>
    document.cookie
        .split("; ")
        .find(row => row.startsWith("KSToken="))
        ?.split("=")[1];

export default getTokenFromCookie;
