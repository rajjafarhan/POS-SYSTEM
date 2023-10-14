import axios from "axios";

export const fetchDashboardData = async ({ queryKey }) => {
  const year = queryKey[1];
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const res = await axios.get(
    `http://localhost:3000/api/dashboard/getstates/${year}`,
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
    `http://localhost:3000/api/dashboard/getprofit/${month}/${year}`,
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
  const res = await axios.get("http://localhost:3000/api/dashboard/years", {
    headers: {
      authorization: bearer,
    },
  });
  return res;
};
