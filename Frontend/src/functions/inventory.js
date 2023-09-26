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
