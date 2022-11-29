import React, { SyntheticEvent } from "react"
import Input from "../../../lib/form/Input"
import categories from "../../data/categories"

const MenuItemForm = (props: {
  onSubmit: Function
  menuItem?: {
    name: string
    description: string
    price: string
    ingredients: string
    category: string
  }
}) => {
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      [key: string]: {
        files: any
        value: string
      }
    }

    const menuItemData = {
      name: target.restaurantName.value,
      description: target.description.value,
      price: target.price.value,
      ingredients: target.ingredients.value,
      category: target.category.value,
      uploadedImage: target.photo.files[0],
    }
    props.onSubmit(menuItemData);
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <Input
          name="restaurantName"
          type="text"
          label="Name"
          value={props.menuItem?.name || ""}
        />
      </div>
      <div className="mt-20">
        <Input
          name="description"
          type="text"
          label="Description"
          value={props.menuItem?.description || ""}
        />
      </div>
      <div className="mt-20">
        <Input
          name="price"
          type="number"
          label="Price"
          value={props.menuItem?.price || ""}
        />
      </div>
      <div className="mt-20">
        <Input
          name="ingredients"
          type="text"
          label="Ingredients"
          value={props.menuItem?.ingredients || ""}
        />
      </div>
      <div className="mt-20">
        <label className="d-block label-style mt-10" htmlFor="category">
          Choose the category of the menu item
        </label>
        <select name="category" defaultValue={props.menuItem?.category}>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-10">
        <label className="custom-file-upload w-300">
          <input type="file" name="photo" accept="image/png, image/jpeg" />
          <i className="fa fa-cloud-upload"></i> Upload Photo
        </label>
      </div>
      <div className="mt-20 d-flex">
        <button className="btn btn-grad">
          {props.menuItem ? "Save" : "Add"}
        </button>
      </div>
    </form>
  )
}

export default MenuItemForm
