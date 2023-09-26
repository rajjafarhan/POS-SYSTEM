//const axios = require('axios').default
import axios from "axios";

export const signup = (data) => {
  return axios.post("http://localhost:3000/user", data);
};
