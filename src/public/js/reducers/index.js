import {combineReducers} from "redux";
import dummy from "./dummy";
import auth from "./auth";
import participant from "./participant";
import asset from "./asset";

const rootReducer = combineReducers({
    dummy,
    auth,
    participant,
    asset
});

export default rootReducer;