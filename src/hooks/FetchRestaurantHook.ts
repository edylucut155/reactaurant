import { get, whereQuery } from "../configs/firebase/actions";

const useFetchRestaurant = () => {
  const fetch = async (key: string, value: string) => {
    if (key === "id") {
      return await get("restaurants", value);
    }
    const restaurants = await whereQuery("restaurants", key, value);
    return restaurants[0];
  };
  return fetch;
};
export default useFetchRestaurant;
