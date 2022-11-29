import React from "react";
import classes from './MenuItem.module.css';
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
}) =>  {
    const { id, name, image, price, description, ingredients, category } = props;
    const container = "mt-10 " + classes.containerItem;
    return (
      <div className={container}>
        <div className="d-flex">
          <div>
            <img className={classes.image} src={props.image} />
          </div>
          <div className="title-style">
            Name: {name}
            <hr />
            Price: ${price}
          </div>
        </div>
        <div className="mt-10 title-style">Description: {description}</div>
        <div className="mt-10 title-style"> Ingredients: {ingredients}</div>
        <h3 className="title-style">Catergory: {category.toUpperCase()}</h3>
        {props.withControls && props.onEdit && props.onDelete && (
            <MenuItemControls 
                onEdit={props.onEdit}
                onDelete={props.onDelete}
                item={{id, name, price, description, ingredients, category}}
            />
        )

        }
      </div>
    )
   
}
export default MenuItem;