import axios from 'axios';
import { GET_ERRORS } from './types';

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
export const loginUser = userData => dispatch => {
  axios
    .post('http://localhost:8000/api/users/login', userData)
    .then(res => console.log(res))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
