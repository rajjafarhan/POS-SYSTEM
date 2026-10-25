import axios from "axios";

export const fetchClosingReport = async ({ queryKey }) => {
  const from = queryKey[1];
  const to = queryKey[2];
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/report/closing`, {
    params: { from, to },
    headers: {
      authorization: bearer,
    },
  });
  return res;
};
