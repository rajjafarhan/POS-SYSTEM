import axios from "axios";

export const addInventory = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post("http://localhost:3000/api/product", data, {
    headers: {
      authorization: bearer,
    },
  });
};

//fetch inventory
export const fetchInventory = async () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get("http://localhost:3000/api/product", {
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
  return axios.put(`http://localhost:3000/api/product/${id}`, data, {
    headers: {
      authorization: bearer,
    },
  });
};

export const deleteInventory = (data) => {
  const id = data._id;
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.delete(`http://localhost:3000/api/product/${id}`, {
    headers: {
      authorization: bearer,
    },
  });
};
