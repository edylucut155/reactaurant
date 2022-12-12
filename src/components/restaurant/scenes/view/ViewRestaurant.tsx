import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchRestaurant from "../../../../hooks/FetchRestaurantHook";
import LandingImage from "../../../../pages/landing/LandingImage";
import "./ViewRestaurant.css";
import MenuItemsList from "../../../menu-items/item-list/MenuItemsList";
import TablesList from "../../../tables/table-list/TableList";

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
          {restaurant.image ? (
            <div className="container-image">
              <img className="image-restaurant" src={restaurant.image} />
            </div>
          ) : null}
          <h1>
            <i>{restaurant.name}</i>
          </h1>
          <div className="card">
            <strong>About us</strong>
            <hr />~ <i>{restaurant.shortDescription}</i> ~
            <p className="text-justify">{restaurant.description}</p>
          </div>
          <div className="card mt-10">
            <strong>Contact</strong>
            <hr />
            Bussiness hours: {restaurant.opensAt} to {restaurant.closesAt}
            <div className="mt-10">
              <i className="fa fa-solid fa-phone mr-10" />
              <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
            </div>
            <div className="mt-10">
              <i className="fa fa-solid fa-envelope mr-10" />
              <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
            </div>
            <div className="mt-10">
              <i className="fa fa-solid fa-location mr-10" />
              <span>{restaurant.address}</span>
            </div>
          </div>
          <div className="mt-10">
            <div className="mt-10">
              <h2>Menu</h2>
              <MenuItemsList withFetch={true} />
            </div>
            <div className="mt-10">
              <h2>Tables</h2>
              <TablesList withFetch={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewRestaurant;
