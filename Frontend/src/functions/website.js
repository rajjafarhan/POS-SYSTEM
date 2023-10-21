import axios from "axios";

export const fetchWebsiteProducts = async () => {
  const res = await axios.get(
    "https://backend-ten-amber.vercel.app/website/getproducts/65315c86b3337fdcd9f5d88e"
  );

  return res;
};
