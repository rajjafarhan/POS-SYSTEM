//const axios = require('axios').default
import axios from "axios";

export const signup = (data) => {
  console.log("invoked");
  return axios.post("http://localhost:3000/user", data);
};
export const login = (data) => {
  return axios.post("http://localhost:3000/signin", data);
};
