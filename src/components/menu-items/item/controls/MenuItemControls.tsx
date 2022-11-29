import React from "react";
import EditMenuItem from "./EditMenuItem";
import DeleteMenuItem from "./DeleteMenuItem";

const MenuItemControls = (props: {
    onEdit: Function;
    onDelete: Function;
    item: {
        id: string;
        name: string;
        description: string;
        price: string;
        ingredients: string;
        category: string
    }
}) => {
    return(
        <div className="mt-10 d-flex">
            <EditMenuItem item={props.item} onEdit={props.onEdit} />
            <DeleteMenuItem id={props.item.id} onDelete={props.onDelete} /> 
        </div>
    )
}

export default MenuItemControls;