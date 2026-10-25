import axios from "axios";
//mutattion
export const postbasicinfo = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  console.log(bearer);
  return axios.put(`${import.meta.env.VITE_API_URL}/api/basicinfo`, data, {
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
    `${import.meta.env.VITE_API_URL}/api/basicinfo`,
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
    `${import.meta.env.VITE_API_URL}/api/basicinfo/email`,
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
    `${import.meta.env.VITE_API_URL}/api/basicinfo/password`,
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
    `${import.meta.env.VITE_API_URL}/api/deleteaccount`,
    data,
    {
      headers: {
        authorization: bearer,
      },
    }
  );
};
