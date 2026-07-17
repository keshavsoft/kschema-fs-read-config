const decodeJwt = (token) => {
    const [header, payload] = token.split(".");

    return {
        header: JSON.parse(atob(header)),
        payload: atob(payload)
    };
};

export default decodeJwt;
