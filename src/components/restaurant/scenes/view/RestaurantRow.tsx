import NavigateButton from "../../../../lib/navigate-button/NavigateButton";
import LandingImage from "../../../../pages/landing/LandingImage";
import { PagesPaths } from "../../../../pages/types";
import "./RestaurantRow.css";

const RestaurantRow = (props: {
  id: string;
  name: string;
  shortDescription: string;
}) => {
  return (
    <div className="container-restaurant mt-10">
      <LandingImage />
      <h2 className="title-style">{props.name}</h2>
      <p>{props.shortDescription}</p>
      <div className="d-flex">
        <NavigateButton path={`/${PagesPaths.RESTAURANT}/${props.id}`}>
          View
        </NavigateButton>
      </div>
    </div>
  );
};

export default RestaurantRow;
