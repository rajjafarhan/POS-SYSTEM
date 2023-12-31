import axios from "axios";

export const postVendorReceipt = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post("https://backend-ten-amber.vercel.app/api/vendor", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const fetchVendorReceipts = async ({ queryKey }) => {
  const offSet = queryKey[1];
  let query = "aisPsqSjMUDTj387Ol";
  if (queryKey[2] !== "") {
    query = queryKey[2];
  }
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(
    `https://backend-ten-amber.vercel.app/api/vendor/${offSet}/${query}`,
    {
      headers: {
        authorization: bearer,
      },
    }
  );

  return res;
};

export const deleteVendorReceipt = (data) => {
  const { id } = data;
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.delete(`https://backend-ten-amber.vercel.app/api/vendor/${id}`, {
    headers: {
      authorization: bearer,
    },
  });
};
