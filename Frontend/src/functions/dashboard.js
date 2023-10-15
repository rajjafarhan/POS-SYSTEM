import axios from "axios";

export const fetchDashboardData = async ({ queryKey }) => {
  const year = queryKey[1];
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(
    `https://posbackend-f3it.onrender.com/api/dashboard/getstates/${year}`,
    {
      headers: {
        authorization: bearer,
      },
    }
  );
  return res;
};

export const fetchMonthStates = async ({ queryKey }) => {
  const month = queryKey[1];
  const year = queryKey[2];

  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(
    `https://posbackend-f3it.onrender.com/api/dashboard/getprofit/${month}/${year}`,
    {
      headers: {
        authorization: bearer,
      },
    }
  );
  return res;
};
export const fetchYears = async () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get("https://posbackend-f3it.onrender.com/api/dashboard/years", {
    headers: {
      authorization: bearer,
    },
  });
  return res;
};
