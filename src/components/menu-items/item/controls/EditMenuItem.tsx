import React, { useState } from "react"
import { set, upload } from "../../../../configs/firebase/actions"
import Modal from "../../../../lib/modal/Modal"
import MenuItemForm from "../../item-form/MenuItemForm"
import { MenuItemData } from "../../types"
import "./ButtonControls.css"

const EditMenuItem = (props: {
  onEdit: Function
  item: {
    id: string
    name: string
    description: string
    price: string
    ingredients: string
    category: string
  }
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const clickHandler = () => setIsModalOpen(true)
  const modalCloseHandler = () => setIsModalOpen(false)

  const editHandler = (data: MenuItemData) => {
    set("menu-items", props.item.id, data).then(() => {
      setIsModalOpen(false)
      props.onEdit({ id: props.item.id, ...data })
    })
  }

  const submitHandler = (data: MenuItemData) => {
    if (data.uploadedImage) {
      upload(data.uploadedImage).then(({ url, ref }) => {
        delete data.uploadedImage
        editHandler({ ...data, image: url, imageRef: ref })
      })
    } else {
      editHandler(data)
    }
  }
  return (
    <div className="d-flex">
      <button className="btn-controls" onClick={clickHandler}>
        Edit
      </button>
      <Modal isOpen={isModalOpen} close={modalCloseHandler}>
        <h2 className="title-style d-flex">Edit Menu Item</h2>
        <MenuItemForm onSubmit={submitHandler} />
      </Modal>
    </div>
  )
}
export default EditMenuItem
