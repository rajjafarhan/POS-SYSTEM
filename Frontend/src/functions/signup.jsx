//const axios = require('axios').default
import axios from "axios";

export const signup = (data) => {
  return axios.post("https://backend-ten-amber.vercel.app/user", data);
};
