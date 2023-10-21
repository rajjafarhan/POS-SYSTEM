import axios from "axios";

export const postCustomerReceipt = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post("https://backend-ten-amber.vercel.app/api/customer", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const fetchCustomerReceipt = async ({ queryKey }) => {
  const offSet = queryKey[1];
  let query = "aisPsqSjMUDTj387Ol";
  if (queryKey[2] !== "") {
    query = queryKey[2];
  }
  console.log(offSet);
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(
    `https://backend-ten-amber.vercel.app/api/customer/${offSet}/${query}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("vendor invoked");
  console.log(res);

  return res;
};

export const deleteCustomerReceipt = (data) => {
  const { id } = data;
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.delete(`https://backend-ten-amber.vercel.app/api/customer/${id}`, {
    headers: {
      authorization: bearer,
    },
  });
};
