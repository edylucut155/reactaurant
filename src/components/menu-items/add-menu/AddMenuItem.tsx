import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { add, upload } from "../../../configs/firebase/actions"
import Modal from "../../../lib/modal/Modal"
import { MenuItemData } from "../types"
import MenuItemForm from "../item-form/MenuItemForm"

const AddMenuItem = (props: { onAdd: Function }) => {
  const { id } = useParams()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const clickHandler = () => setIsModalOpen(true)
  const modalCloseHandler = () => setIsModalOpen(false)

  const addMenuItem = (data:MenuItemData) => {
      add("menu-items", {
          ...data,
          restaurantId: id,
      }).then((menuItem) => {
          setIsModalOpen(false);
          props.onAdd({...data, id: menuItem.id});
      })
  }

  const submitHandler = (data:MenuItemData) => {
      if(data.uploadedImage) {
          upload(data.uploadedImage).then(({url, ref}) =>{
              delete data.uploadedImage;
              addMenuItem({...data, image: url, imageRef:ref});
          })
      } else {
          addMenuItem(data);
      }
  }
  return (
    <div className="d-flex">
      <button className="btn btn-grad" onClick={clickHandler}>
        Add Menu Item
      </button>
      <Modal isOpen={isModalOpen} close={modalCloseHandler}>
        <h2 className="title-style d-flex">Add Menu Item</h2>
        <MenuItemForm onSubmit ={submitHandler}/>
      </Modal>
    </div>
  )
}

export default AddMenuItem
