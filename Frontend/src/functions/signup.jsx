//const axios = require('axios').default
import axios from "axios";

export const signup = (data) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/user`, data);
};
