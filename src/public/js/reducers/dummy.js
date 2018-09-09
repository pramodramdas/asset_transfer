import {SET_DUMMY} from "../actions/types";

const INITIAL_STATE = {
  dummy: {}
};

export default (state = INITIAL_STATE, action = {}) => {

  switch (action.type) {
  case SET_DUMMY:
    return {
      ...state,
      ...action.content
    };
  default:
    return state;
  }

}