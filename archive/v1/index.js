import { scoutTheRealmForTargetJsons } from "./adventure/scout.js";
import { consultTheAncientScrolls } from "./adventure/oracle.js";
import { transmuteGemsWithWisdom } from "./adventure/blacksmith.js";

const startFunc = ({ toPath, configPath, inAction }) => {
    switch (inAction) {
        case "Crud":
            const sacredWisdom = consultTheAncientScrolls({ scrollPath: configPath });
            const hiddenGems = scoutTheRealmForTargetJsons(toPath);
            transmuteGemsWithWisdom({ gems: hiddenGems, wisdom: sacredWisdom });
            break;
        default:
            break;
    }
    return true;
};

export default startFunc;