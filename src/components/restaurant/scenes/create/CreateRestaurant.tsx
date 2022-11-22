import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { add } from "../../../../configs/firebase/actions";
import useFetchRestaurant from "../../../../hooks/FetchRestaurantHook";
import useUserDetails from "../../../../hooks/UserDetailsHook";
import { PagesPaths } from "../../../../pages/types";
import RestaurantForm, { formDataInterface } from "../../form/RestaurantForm";

const CreateRestaurant = () => {
  const navigate = useNavigate();
  const { getCurrentUserDetails } = useUserDetails();
  const getRestaurant = useFetchRestaurant();
  const { id: userId } = getCurrentUserDetails();

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    getRestaurant("userId", userId).then((restaurant) => {
      setAllowed(!restaurant);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Please wait...</div>;
  if (!allowed) return <div>You already created a restaurant!</div>;

  const submitHandler = (formData: formDataInterface) => {
    add("restaurants", { ...formData, userId }).then(() => {
      navigate(PagesPaths.DASHBOARD);
    });
  };

  const cancelHandler = () => {
    navigate(PagesPaths.LANDING);
  };

  return (
    <RestaurantForm
      title="Create Restaurant"
      onSubmit={submitHandler}
      onCancel={cancelHandler}
      submitActionName="Create Restaurant"
    />
  );
};
export default CreateRestaurant;
