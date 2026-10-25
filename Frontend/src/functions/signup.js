//const axios = require('axios').default
import axios from "axios";

export const signup = (data) => {
  // console.log("invoked");
  return axios.post(`${import.meta.env.VITE_API_URL}/user`, data);
};
export const login = (data) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/signin`, data);
};
