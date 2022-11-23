import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchRestaurant from "../../../../hooks/FetchRestaurantHook";
import LandingImage from "../../../../pages/landing/LandingImage";
import "./ViewRestaurant.css";

const ViewRestaurant = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const getRestaurant = useFetchRestaurant();
  const [restaurant, setRestaurant] = useState<DocumentData | null>();

  useEffect(() => {
    if (!id) return;
    getRestaurant("id", id).then((restaurant) => {
      setRestaurant(restaurant);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Please wait...</div>;
  if (!(id && restaurant)) return <div>Restaurant not found!</div>;

  return (
    <div>
      <LandingImage />
      <div className="modal-well">
        <div className="mid-board">
          <div className="container-image">
            <img className="image-restaurant" src={restaurant.image} />
          </div>
          <h1 className="information-style m-0 text-black">
            <i>{restaurant.name}</i>
          </h1>
          <div className="container-information mb-0">
            <h3 className="information-style mr-10">Short description: </h3>
            <i>{restaurant.shortDescription}</i>
          </div>
          <div className="container-information">
            <h3 className="information-style mr-10">Description: </h3>
            <i> {restaurant.description}</i>
          </div>
          <div className="container-information">
            <h3 className="information-style mr-10">Working hours: </h3>
            <i>
              From {restaurant.opensAt} to {restaurant.closesAt}
            </i>
          </div>
          <div className="mt-10">
            <h2 className="text-black mb-0">Contact</h2>
            <div className="container-information">
              <h3 className="information-style mr-10">Phone:</h3>
              {restaurant.address}
            </div>
            <div className="container-information">
              <h3 className="information-style mr-10">Address:</h3>
              {restaurant.phone}
            </div>
            <div className="container-information">
              <h3 className="information-style mr-10">Email:</h3>
              {restaurant.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewRestaurant;
