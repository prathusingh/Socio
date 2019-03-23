import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // atatch token to Authorization header
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
