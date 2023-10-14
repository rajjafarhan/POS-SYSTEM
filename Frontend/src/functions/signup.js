//const axios = require('axios').default
import axios from "axios";

export const signup = (data) => {
  // console.log("invoked");
  return axios.post("https://posbackend-f3it.onrender.com/user", data);
};
export const login = (data) => {
  return axios.post("https://posbackend-f3it.onrender.com/signin", data);
};
