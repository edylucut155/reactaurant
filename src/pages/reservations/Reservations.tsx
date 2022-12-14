import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserTypes } from "../../components/auth/types";
import { get, set, whereQuery } from "../../configs/firebase/actions";
import useUserDetails from "../../hooks/UserDetailsHook";
import NavigateButton from "../../lib/navigate-button/NavigateButton";
import LandingImage from "../landing/LandingImage";

const Reservations = () => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<DocumentData[]>();
  const { getCurrentUserDetails } = useUserDetails();
  const userDetails = getCurrentUserDetails();
  const isOwner = userDetails.type === UserTypes.RESTAURANT;

  useEffect(() => {
    if (!isOwner) {
      whereQuery("reservations", "userId", userDetails.id).then(
        (receivedReservations) => {
          setReservations(receivedReservations);
          setLoading(false);
        }
      );
    } else {
      const fetchData = async () => {
        const restaurants = await whereQuery(
          "restaurants",
          "userId",
          userDetails.id
        );
        const restaurant = restaurants[0];
        const tables = await whereQuery(
          "tables",
          "restaurantId",
          restaurant?.id
        );

        const reservations = await whereQuery(
          "reservations",
          "tableId",
          tables.map((table) => table.id),
          "in"
        );

        setReservations(reservations);

        setLoading(false);
      };

      fetchData();
    }
  }, []);

  if (loading) {
    return <p>Please wait...</p>;
  }

  if (!reservations || reservations.length === 0) {
    return <p>No reservations.</p>;
  }

  // Added after the live course: param types
  const statusChangeHandler = (id: string, status: string) => {
    set("reservations", id, { status }).then(() => {
      const newReservations = [...reservations];
      const reservationIndex = newReservations.findIndex(
        (reservation) => reservation.id === id
      );
      newReservations[reservationIndex] = {
        ...newReservations[reservationIndex],
      };
      newReservations[reservationIndex].status = status;

      setReservations(newReservations);
    });
  };

  return (
    <>
      <LandingImage />
      <h1>Reservations</h1>
      {reservations.map((reservation) => {
        // Added after the live course: Border color based on status
        let borderColor = "orange"; // default
        if (reservation.status === "Approved") borderColor = "green";
        if (reservation.status === "Declined") borderColor = "red";
        return (
          <div
            key={reservation.id}
            className="card"
            style={{ border: `2px solid ${borderColor}` }}
          >
            {reservation.status}
            <hr />
            {reservation.id}
            <NavigateButton
              isSmall={true}
              path={`/reservations/${reservation.id}`}
            >
              Details
            </NavigateButton>
            {isOwner && reservation.status === "Pending" ? (
              <div className="d-flex mt-10">
                <button
                  className="btn-controls"
                  onClick={() => {
                    statusChangeHandler(reservation.id, "Approved");
                  }}
                >
                  Approve
                </button>
                <button
                  className="btn-controls"
                  onClick={() => {
                    statusChangeHandler(reservation.id, "Declined");
                  }}
                >
                  Decline
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default Reservations;
