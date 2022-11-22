import { useEffect, useState } from "react";
import useFetchRestaurant from "../../hooks/FetchRestaurantHook";
import useUserDetails from "../../hooks/UserDetailsHook";
import NavigateButton from "../../lib/navigate-button/NavigateButton";
import { PagesPaths } from "../../pages/types";
import { UserTypes } from "../auth/types";

const Action = () => {
  const { getCurrentUserDetails } = useUserDetails();
  const userDetails = getCurrentUserDetails();
  const currentUserIsOwner = userDetails.type === UserTypes.RESTAURANT;
  const getRestaurant = useFetchRestaurant();

  const [action, setAction] = useState(
    currentUserIsOwner
      ? null
      : {
          path: `/${PagesPaths.RESTAURANTS}`,
          text: "Restaurants",
        }
  );

  useEffect(() => {
    if (action) return;
    getRestaurant("userId", userDetails.id).then((restaurant) => {
      setAction({
        path: restaurant
          ? `/${PagesPaths.MANAGE_RESTAURANT}`
          : `/${PagesPaths.CREATE_RESTAURANT}`,
        text: `${restaurant ? "Manage" : "Create"} Restaurant`,
      });
    });
  }, []);

  if (!action) return <div>Please wait ...</div>;
  return (
    <NavigateButton key={action.path} path={action.path}>
      {action.text}
    </NavigateButton>
  );
};
export default Action;
