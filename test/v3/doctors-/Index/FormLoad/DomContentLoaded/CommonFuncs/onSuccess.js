import afterHeadSave from "./afterHeadSave.js";

const onSuccessFunc = async (res) => {
    const fromReponse = await res.json();
    // console.log("fromReponse : ", fromReponse);

    document.getElementById("htmlId").innerHTML = fromReponse.pk;

    // window.location.href = `../WithSubTable/index.html?pk=${fromReponse.pk}`;
    await afterHeadSave(fromReponse.pk);
};

export default onSuccessFunc;