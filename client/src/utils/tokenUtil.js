import axios from 'axios';

export default {
  setAuthToken: token => {
    if (token) {
      // attach token to Authorization header
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      // delete auth header
      delete axios.defaults.headers.common['Authorization'];
    }
  }
};
