import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAll } from "../../../../configs/firebase/actions";

import RestaurantRow from "./RestaurantRow";

const Restaurants = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<DocumentData[]>([]);

  useEffect(() => {
    getAll("restaurants").then((data) => {
      setLoading(false);
      setRestaurants(data);
    });
  }, []);

  let content = null;

  if (loading) {
    content = <div>Please wait...</div>;
  } else if (restaurants.length) {
    content = restaurants.map((restaurant) => (
      <RestaurantRow
        key={restaurant.id}
        id={restaurant.id}
        name={restaurant.name}
        shortDescription={restaurant.shortDescription}
      />
    ));
  } else {
    content = <div>There are no restaurants.</div>;
  }

  return (
    <div>
      <h1>Restaurants</h1>
      {content}
    </div>
  );
};

export default Restaurants;
