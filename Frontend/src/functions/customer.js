import axios from "axios";

export const postCustomerReceipt = (data) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  return axios.post(`${import.meta.env.VITE_API_URL}/api/customer`, data, {
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
    `${import.meta.env.VITE_API_URL}/api/customer/${offSet}/${query}`,
    {
      params: queryKey[3] === "unpaid" ? { status: "unpaid" } : {},
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
  return axios.delete(`${import.meta.env.VITE_API_URL}/api/customer/${id}`, {
    headers: {
      authorization: bearer,
    },
  });
};

export const deleteManyCustomerReceipts = ({ ids }) =>
  axios.post(
    `${import.meta.env.VITE_API_URL}/api/customer/delete-many`,
    { ids },
    { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
  );


// Record a later payment on a part-paid receipt (udhaar).
export const addCustomerPayment = ({ id, amount, date, note }) =>
  axios.post(
    `${import.meta.env.VITE_API_URL}/api/customer/${id}/payments`,
    { amount, date, note },
    { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

// Total still owed by customers and on how many receipts.
export const fetchOutstanding = () =>
  axios.get(`${import.meta.env.VITE_API_URL}/api/customer-outstanding`, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
