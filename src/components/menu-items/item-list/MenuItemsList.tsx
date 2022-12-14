import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMenuItems } from "../actions";
import "./MenuItemsList.css";
import MenuItem from "../item/MenuItem";

const MenuItemsList = (props: {
  menuItems?: DocumentData[];
  withFetch: boolean;
  onEdit?: Function;
  onDelete?: Function;
  restaurantId?: string;
  onAdd?: Function;
  onRemove?: Function;
}) => {
  const [menuItems, setMenuItems] = useState<DocumentData[]>([]);

  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const restId = props.restaurantId || id;
    if (props.withFetch && restId) {
      fetchMenuItems(restId).then((data) => {
        setMenuItems(data);
        setLoading(false);
      });
    }
  }, []);

  if (props.withFetch && loading) {
    return <div className="mt-10">Loading...</div>;
  }

  const items = props.withFetch ? menuItems : props.menuItems;

  if (!items || items.length === 0) {
    return <div className="mt-10 span-style"> The menu is empty </div>;
  }

  return (
    <div className="d-flex">
      {items
        .sort((item1, item2) => (item1.price < item2.price ? -1 : 1))
        .map((menuItem) => (
          <MenuItem
            key={menuItem.id}
            id={menuItem.id}
            name={menuItem.name}
            image={menuItem.image}
            price={menuItem.price}
            description={menuItem.description}
            ingredients={menuItem.ingredients}
            category={menuItem.category}
            withControls={!props.withFetch}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
          />
        ))}
    </div>
  );
};

export default MenuItemsList;
