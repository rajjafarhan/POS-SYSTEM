import axios from "axios";

export const addInventory = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post("https://posbackend-f3it.onrender.com/api/product", data, {
    headers: {
      authorization: bearer,
    },
  });
};

//fetch inventory
export const fetchInventory = async () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get("https://posbackend-f3it.onrender.com/api/product", {
    headers: {
      authorization: bearer,
    },
  });

  return res;
};

export const updateInventory = (data) => {
  const id = data._id;
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.put(`https://posbackend-f3it.onrender.com/api/product/${id}`, data, {
    headers: {
      authorization: bearer,
    },
  });
};

export const deleteInventory = (data) => {
  const id = data._id;
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.delete(`https://posbackend-f3it.onrender.com/api/product/${id}`, {
    headers: {
      authorization: bearer,
    },
  });
};
