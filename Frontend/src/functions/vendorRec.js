import axios from "axios";

export const postVendorReceipt = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post("http://localhost:3000/api/vendor", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const fetchVendorReceipts = async ({ queryKey }) => {
  const offSet = queryKey[1];
  console.log(offSet);
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(`http://localhost:3000/api/vendor/${offSet}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  console.log("vendor invoked");
  console.log(res);

  return res;
};
