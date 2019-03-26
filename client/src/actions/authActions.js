import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';
import { LOGOUT_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

// register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('http://localhost:8000/api/users/register', userData)
    .then(res => history.push('./login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// login user
export const loginUser = (userData, history) => dispatch => {
  axios
    .post('http://localhost:8000/api/users/login', userData)
    .then(res => {
      // save to local storage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      // set token to auth header
      setAuthToken(token);

      // decode token
      const decoded = jwt_decode(token);

      // set current user
      dispatch(setCurrentUser(decoded));

      // redirect to current user home page
      history.push('./feed');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set logged in user
export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

// logout
export const logoutUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};
