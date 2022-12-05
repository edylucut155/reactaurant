import React, { useEffect, useState } from "react"
import LandingImage from "../landing/LandingImage"
import AddMenuItem from "../../components/menu-items/add-menu/AddMenuItem"
import { DocumentData } from "firebase/firestore"
import { useParams } from "react-router-dom"
import { fetchMenuItems } from "../../components/menu-items/actions"
import { MenuItemData } from "../../components/menu-items/types"
import MenuItemsList from "../../components/menu-items/item-list/MenuItemsList"

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState<DocumentData[]>([])

  const [loading, setLoading] = useState(true)
  //Get the id param from the URL
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      fetchMenuItems(id).then(data => {
        setMenuItems(data)
        setLoading(false)
      })
    }
  }, [])

  const addMenuItem = (data: MenuItemData) => {
    setMenuItems(prevMenuItems => [data, ...prevMenuItems])
  }

  const editItemHandler = (data: MenuItemData) => {
    setMenuItems(prevMenuItems => {
      const newMenuItem = prevMenuItems.map(menuItem => {
        if (menuItem.id === data.id) {
          if (data.image) {
            return data
          }
          return { ...data, image: menuItem.image }
        }
        return menuItem
      })
      return newMenuItem
    })
  }

  const deleteItemHandler = (id: string) => {
    setMenuItems(prevMenuItems => {
      const newMenuItems = prevMenuItems.filter(menuItems => menuItems.id != id)
      return newMenuItems
    })
  }
  return (
    <>
      <LandingImage />
      <h1 className="title-style"> Manage Menu </h1>
      <AddMenuItem onAdd={addMenuItem} />
      {!loading && (
        <MenuItemsList
          menuItems={menuItems}
          withFetch={false}
          onEdit={editItemHandler}
          onDelete={deleteItemHandler}
        />
      )}
    </>
  )
}

export default ManageMenu
