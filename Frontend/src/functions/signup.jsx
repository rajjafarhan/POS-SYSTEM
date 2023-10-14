//const axios = require('axios').default
import axios from "axios";

export const signup = (data) => {
  return axios.post("https://posbackend-f3it.onrender.com/user", data);
};
