const getData = async () => {
    const config = await fetch("/api/v1/doctors/showAll");
    const data = await config.json();

    return await data;
};

export default getData;