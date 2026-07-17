import decodeJwt from "./decodeJwt.js";
import getTokenFromCookie from "./getTokenFromCookie.js";

const getUserCode = () => {
    const token = getTokenFromCookie();

    if (!token) return "";

    return decodeJwt(token).payload;
};

export default getUserCode;
