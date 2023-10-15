import axios from "axios";
//mutattion
export const postbasicinfo = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  console.log(bearer);
  return axios.put("https://posbackend-f3it.onrender.com/api/basicinfo", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

//query react

export const fetchBasicInfo = async () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(
    "https://posbackend-f3it.onrender.com/api/basicinfo",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
};

export const postEmail = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.put(
    "https://posbackend-f3it.onrender.com/api/basicinfo/email",
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const resetPassword = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.put(
    "https://posbackend-f3it.onrender.com/api/basicinfo/password",
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteAccount = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post(
    "https://posbackend-f3it.onrender.com/api/deleteaccount",
    data,
    {
      headers: {
        authorization: bearer,
      },
    }
  );
};
