import axios from 'axios';

export default {
  setAuthToken: token => {
    if (token) {
      // atatch token to Authorization header
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      // delete auth header
      delete axios.defaults.headers.common['Authorization'];
    }
  }
};
