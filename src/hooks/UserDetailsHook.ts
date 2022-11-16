import { User } from "../components/auth/types";

const useUserDetails = () => {
    const storeCurrentUserDetails = (data: User | null) => {
        if(!!data){
            localStorage.setItem("userData",JSON.stringify(data));
            return;
        }
        localStorage.setItem("userData","");
    }

    const getCurrentUserDetails: () => User = () => {
        const storagedUserData = localStorage.getItem("userData");
        if(!!storagedUserData) return JSON.parse(storagedUserData);
        return null;
    }

    return {getCurrentUserDetails, storeCurrentUserDetails}
}

export default useUserDetails;