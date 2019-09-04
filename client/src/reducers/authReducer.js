import { SET_CURRENT_USER } from '../actions/types';
import { LOGOUT_CURRENT_USER } from '../actions/types';
import { SET_SYSTEM_MESSAGE } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  systemMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGOUT_CURRENT_USER:
      return {
        ...state,
        ...initialState
      };
    case SET_SYSTEM_MESSAGE:
      return {
        ...state,
        systemMessage: action.payload
      };
    default:
      return state;
  }
};
