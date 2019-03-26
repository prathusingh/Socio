import { SET_CURRENT_USER } from '../actions/types';
import { LOGOUT_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
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
    default:
      return state;
  }
}
