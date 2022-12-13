import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../configs/firebase/actions";
import LandingImage from "../landing/LandingImage";

const Reservation = () => {
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState<DocumentData>();
  const [table, setTable] = useState<DocumentData>();
  const [restaurant, setRestaurant] = useState<DocumentData>();
  const [customer, setCustomer] = useState<DocumentData>();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const receivedReservation = await get("reservations", id);
      if (!receivedReservation) return;
      setReservation(receivedReservation);

      const receivedTable = await get("tables", receivedReservation.tableId);
      if (!receivedTable) return;
      setTable(receivedTable);

      const receivedRestaurant = await get(
        "restaurants",
        receivedTable.restaurantId
      );
      if (!receivedRestaurant) return;
      setRestaurant(receivedRestaurant);

      const receivedCustomer = await get("users", receivedReservation.userId);
      if (!receivedCustomer) return;
      setCustomer(receivedCustomer);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Please wait...</p>;
  }

  if (!reservation || !table || !restaurant || !customer) {
    return <p>Something went wrong!</p>;
  }

  // Added after the live course: Border colors based on status
  let borderColor = "orange"; // default
  if (reservation.status === "Approved") borderColor = "green";
  if (reservation.status === "Declined") borderColor = "red";
  const borderStyle = `5px solid ${borderColor}`;

  return (
    <>
      <LandingImage />
      <h1>Reservation</h1>
      <div
        className="card"
        style={{ borderRight: borderStyle, borderBottom: borderStyle }}
      >
        <h2>{table.name}</h2>
        <p>{restaurant.name}</p>
        <p>{reservation.date}</p>
        <p>
          <i className="fa fa-solid fa-user" /> x {reservation.groupSize}
        </p>
        <hr />
        <h3>Contact</h3>
        <p>{customer.name}</p>
        <p>
          <i className="fa fa-solid fa-phone" />{" "}
          <a href="tel:07123">{customer.phoneNumber}</a>
        </p>
        <p>
          <i className="fa fa-solid fa-envelope" />{" "}
          <a href="mailto:07123">{customer.email}</a>
        </p>
        <hr />
        <div className="pre-wrap">{reservation.receipt}</div>
      </div>
      <p>= {reservation.status} =</p>
    </>
  );
};

export default Reservation;
