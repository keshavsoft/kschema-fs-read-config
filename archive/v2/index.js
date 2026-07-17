import dotenv from "dotenv";
import path from "path";

const startFunc = ({ rootPath }) => {
    dotenv.config({
        path: path.join(rootPath, ".env")
    });

    console.log(process.env.PORT);
};

export default startFunc;