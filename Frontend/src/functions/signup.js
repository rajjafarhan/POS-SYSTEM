//const axios = require('axios').default
import axios from "axios";

export const signup = (data) => {
  // console.log("invoked");
  return axios.post("https://backend-ten-amber.vercel.app/user", data);
};
export const login = (data) => {
  return axios.post("https://backend-ten-amber.vercel.app/signin", data);
};
