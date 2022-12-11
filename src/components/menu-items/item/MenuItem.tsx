import React from "react";
import classes from "./MenuItem.module.css";
import MenuItemControls from "./controls/MenuItemControls";

const MenuItem = (props: {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
  ingredients: string;
  category: string;
  withControls?: boolean;
  onEdit?: Function;
  onDelete?: Function;
}) => {
  const { id, name, image, price, description, ingredients, category } = props;
  return (
    <div className={`${classes.containerItem} mt-10 card`}>
      <div className="d-flex">
        <div>
          <img className={classes.image} src={image} />
        </div>
        <div>
          <strong>{name}</strong>
          <hr />${price}
        </div>
      </div>
      <div className="mt-10">{description}</div>
      <div className="mt-10"> Ingredients: {ingredients}</div>
      <p>{category}</p>
      {props.withControls && props.onEdit && props.onDelete && (
        <MenuItemControls
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          item={{ id, name, price, description, ingredients, category }}
        />
      )}
    </div>
  );
};
export default MenuItem;
