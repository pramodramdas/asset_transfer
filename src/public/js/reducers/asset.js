
import { SET_ASSET } from "../actions/types";

const INITIAL_STATE = {
    assets: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_ASSET:
      return {
        ...state,
        ...action.content
      };
    default:
      return state;
  }

}