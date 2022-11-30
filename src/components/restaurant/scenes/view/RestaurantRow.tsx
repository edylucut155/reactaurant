import NavigateButton from "../../../../lib/navigate-button/NavigateButton";
import LandingImage from "../../../../pages/landing/LandingImage";
import { PagesPaths } from "../../../../pages/types";
import "./RestaurantRow.css";

const RestaurantRow = (props: {
  id: string;
  name: string;
  shortDescription: string;
  opensAt: string;
  closesAt: string;
}) => {
  const isOpen = (): boolean => {
    const currentTimestamp = new Date().getTime();
    const opensAtTime = getTimestamp(props.opensAt);
    const closesAtTime = getTimestamp(props.closesAt);
    return currentTimestamp > opensAtTime && currentTimestamp < closesAtTime;
  };

  const getTimestamp = (time: string) => {
    const today = new Date();
    const timeAtHourMinutes = time.split(":");

    return new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      +timeAtHourMinutes[0],
      +timeAtHourMinutes[1]
    ).getTime();
  };

  return (
    <div className="container-restaurant mt-10">
      <LandingImage />
      <h2 className="title-style">{props.name}</h2>
      <p>{props.shortDescription}</p>
      {isOpen() ? (
        <p>
          <i className="fa-solid fa-door-open bg-secondary"></i> Open!
        </p>
      ) : (
        <p>
          <i className="fa-solid fa-door-closed bg-secondary"></i> Closed!
        </p>
      )}
      <div className="d-flex">
        <NavigateButton path={`/${PagesPaths.RESTAURANT}/${props.id}`}>
          View
        </NavigateButton>
      </div>
    </div>
  );
};

export default RestaurantRow;
