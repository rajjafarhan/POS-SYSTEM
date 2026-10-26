import axios from "axios";

const auth = () => ({ authorization: `Bearer ${localStorage.getItem("token")}` });

// queryKey: ["returns"] for all returns, ["returns", invoiceId] for one invoice's returns
export const fetchReturns = async ({ queryKey }) => {
  const invoiceId = queryKey[1];
  return axios.get(`${import.meta.env.VITE_API_URL}/api/returns`, {
    params: invoiceId ? { invoiceId } : {},
    headers: auth(),
  });
};

export const postReturn = (data) =>
  axios.post(`${import.meta.env.VITE_API_URL}/api/returns`, data, {
    headers: auth(),
  });

export const deleteReturn = ({ id }) =>
  axios.delete(`${import.meta.env.VITE_API_URL}/api/returns/${id}`, {
    headers: auth(),
  });
