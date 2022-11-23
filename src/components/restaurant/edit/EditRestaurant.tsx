import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { set } from "../../../configs/firebase/actions";
import useFetchRestaurant from "../../../hooks/FetchRestaurantHook";
import useUserDetails from "../../../hooks/UserDetailsHook";
import { PagesPaths } from "../../../pages/types";
import RestaurantForm, { formDataInterface } from "../form/RestaurantForm";

const EditRestaurant = () => {
  const navigate = useNavigate();
  const getRestaurant = useFetchRestaurant();
  const { getCurrentUserDetails } = useUserDetails();
  const { id: userId } = getCurrentUserDetails();

  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<DocumentData | undefined>();

  useEffect(() => {
    getRestaurant("userId", userId).then((restaurant) => {
      setRestaurant(restaurant);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Please wait...</div>;
  if (!restaurant) return <div>You already created a Restaurant!</div>;

  const submitHandler = (formData: formDataInterface) => {
    set("restaurants", restaurant.id, formData).then(() => {
      navigate(`/${PagesPaths.MANAGE_RESTAURANT}`);
    });
  };

  const cancelHandler = () => {
    navigate(`/${PagesPaths.MANAGE_RESTAURANT}`);
  };

  return (
    <RestaurantForm
      title="Edit Restaurant"
      onSubmit={submitHandler}
      onCancel={cancelHandler}
      restaurant={restaurant}
      submitActionName="Save"
    />
  );
};
export default EditRestaurant;
