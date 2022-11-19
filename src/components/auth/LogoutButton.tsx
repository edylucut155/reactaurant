import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/AuthContext";
import { PagesPaths } from "../../pages/types";
import useSnackBar ,{VariantType} from "../../hooks/UseSnackBar";

const LogoutButton = () => {
    const { logOut } = useUserAuth();
    const navigate  = useNavigate();
    const enqueueSnackBar = useSnackBar();

    const logOutHandler =  async() => {
        try{
            await logOut();
            navigate(PagesPaths.LANDING);
            enqueueSnackBar("You logged out successfully",VariantType.SUCCESS);
        }catch(err){
            alert('couldnt log out');
            enqueueSnackBar("Could not log out",VariantType.ERROR);
        }
    }

    return(
        <button className="btn btn-grad" onClick={logOutHandler}>
            Log Out
        </button>
    )
}

export default LogoutButton;