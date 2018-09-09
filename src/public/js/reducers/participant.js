
import { SET_PARTICIPANT } from "../actions/types";

const INITIAL_STATE = {
    participants: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_PARTICIPANT:
      return {
        ...state,
        ...action.content
      };
    default:
      return state;
  }

}