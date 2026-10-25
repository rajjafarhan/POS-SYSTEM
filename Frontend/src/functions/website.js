import axios from "axios";

export const fetchWebsiteProducts = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/website/getproducts/65315c86b3337fdcd9f5d88e`
  );

  return res;
};
