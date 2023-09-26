import axios from "axios";

export const postbasicinfo = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  console.log(bearer);
  return axios.put("http://localhost:3000/api/basicinfo", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const fetchBasicInfo = async () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get("http://localhost:3000/api/basicinfo", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const postEmail = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  console.log(bearer);
  return axios.put("http://localhost:3000/api/basicinfo/email", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
