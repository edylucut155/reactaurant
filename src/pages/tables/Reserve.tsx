import LandingImage from "../landing/LandingImage";
import Input from "../../lib/form/Input";
import MenuItemsList from "../../components/menu-items/item-list/MenuItemsList";
import { SyntheticEvent, useEffect, useState } from "react";
import { add, get } from "../../configs/firebase/actions";
import { useNavigate, useParams } from "react-router-dom";
import useUserDetails from "../../hooks/UserDetailsHook";

const ReserveTable = () => {
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState();
  const [menuItems, setMenuItems] = useState<
    { id: string; quantity: number; price: number; name: string }[]
  >([]);
  const { id } = useParams();
  const { getCurrentUserDetails } = useUserDetails();
  const navigate = useNavigate();

  const userId = getCurrentUserDetails().id;

  useEffect(() => {
    if (!id) return;
    get("tables", id).then((table) => {
      setRestaurantId(table?.restaurantId);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Please wait...</p>;
  }

  let total = 0;
  let receipt = menuItems
    .map((menuItem) => {
      const menuItemTotalPrice = menuItem.quantity * menuItem.price;
      total += menuItemTotalPrice;

      const maxLength = 100;
      const leftSide = `${menuItem.quantity} x ${menuItem.name} `;
      const rightSide = ` $ ${menuItemTotalPrice}`;

      return `${leftSide}${[
        ...Array(maxLength - leftSide.length - rightSide.length).keys(),
      ]
        .map(() => ".")
        .join("")}${rightSide}\n`;
    })
    .join("");
  receipt += `\nTotal: $ ${total}`;

  const addItemCallback = (item: {
    id: string;
    price: number;
    name: string;
  }) => {
    const menuItemIndex = menuItems.findIndex((menuItem) => {
      return menuItem.id === item.id;
    });

    const newMenuItems = [...menuItems];

    if (menuItemIndex !== -1) {
      newMenuItems[menuItemIndex] = { ...newMenuItems[menuItemIndex] };
      newMenuItems[menuItemIndex].quantity++;
    } else {
      newMenuItems.push({ ...item, quantity: 1 });
    }
    setMenuItems(newMenuItems);
  };

  const removeItemCallback = (id: string) => {
    const menuItemIndex = menuItems.findIndex((menuItem) => {
      return menuItem.id === id;
    });

    if (menuItemIndex === -1) return;

    let newMenuItems;
    if (menuItems[menuItemIndex].quantity > 1) {
      newMenuItems = [...menuItems];
      newMenuItems[menuItemIndex] = { ...newMenuItems[menuItemIndex] };
      newMenuItems[menuItemIndex].quantity--;
    } else {
      newMenuItems = menuItems.filter((menuItem) => {
        return menuItem.id !== id;
      });
    }

    setMenuItems(newMenuItems);
  };

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      [key: string]: { value: string };
    };
    add("reservations", {
      date: target.date.value,
      groupSize: target.groupSize.value,
      receipt,
      tableId: id,
      status: "Pending",
      userId,
    }).then((reservation) => {
      navigate(`/reservations/${reservation.id}`);
    });
  };

  return (
    <>
      <LandingImage />
      <h1>Reserve Table</h1>
      <form onSubmit={submitHandler}>
        <div className="card">
          <Input label="Date" type="datetime-local" name="date" value="" />
          <br />
          <Input label="Group Size" type="number" name="groupSize" value="" />
        </div>
        <MenuItemsList
          withFetch={true}
          restaurantId={restaurantId}
          onAdd={addItemCallback}
          onRemove={removeItemCallback}
        />
        <div className="card pre-wrap">
          <h3>Receipt</h3>
          {menuItems.length ? receipt : "No items."}
          <button className="btn btn-grad mt-10 mx-auto">Reserve</button>
        </div>
      </form>
    </>
  );
};

export default ReserveTable;
