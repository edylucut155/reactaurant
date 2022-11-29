import { whereQuery } from "../../configs/firebase/actions";

export const fetchMenuItems = async (restaurantId: string)=> {
    return whereQuery("menu-items", "restaurantId", restaurantId).then((data)=> {
        return data;
    })
}