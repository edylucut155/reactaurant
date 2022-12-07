import { whereQuery } from "../../../configs/firebase/actions"

export const fetchTables = async (restaurantId: string) => {
    return whereQuery("tables", "restaurantId", restaurantId).then((data) => {
        return data;
    });
}