import { useEffect, useState } from "react";
import useFetchRestaurant from "../../../../hooks/FetchRestaurantHook";
import useUserDetails from "../../../../hooks/UserDetailsHook";
import NavigateButton from "../../../../lib/navigate-button/NavigateButton";
import LandingImage from "../../../../pages/landing/LandingImage";
import { PagesPaths } from "../../../../pages/types";

const ManageRestaurant = () => {
  const { getCurrentUserDetails } = useUserDetails();
  const { id: userId } = getCurrentUserDetails();
  const getRestaurant = useFetchRestaurant();
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    getRestaurant("userId", userId).then((restaurant) => {
      setRestaurantId(restaurant?.id);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Please wait...</div>;
  if (!restaurantId) return <div>Restaurant not found!</div>;

  return (
    <div>
      <LandingImage />
      <div className="modal-well">
        <div className="mid-board">
          <h1 className="title-style">Manage Restaurant</h1>
          <div className="d-flex">
            <div className="mt-10">
              <NavigateButton
                path={`/${PagesPaths.RESTAURANT}/${restaurantId}`}
              >
                View Restaurant
              </NavigateButton>
            </div>
            <div className="mt-10">
              <NavigateButton path={`/${PagesPaths.EDIT_RESTAURANT}`}>
                Edit Restaurant
              </NavigateButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageRestaurant;
