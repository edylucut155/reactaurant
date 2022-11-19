import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/AuthContext";
import { PagesPaths } from "../../pages/types";
import { ToastVariants, useToast } from "../../contexts/ToastContext";

const LogoutButton = () => {
    const { logOut } = useUserAuth();
    const navigate  = useNavigate();
    const  { enqueueToast } = useToast();

    const logOutHandler =  async() => {
        try{
            await logOut();
            navigate(PagesPaths.LANDING);
            enqueueToast({
                message: "Logged out successfully",
                id: "logoutSuccessToast",
                variant: ToastVariants.SUCCESS
            })
        }catch(err){
            enqueueToast({
                message: "Could not log out",
                id: "logoutErrorToast",
                variant: ToastVariants.ERROR
            })
            console.log(err)
        }
    }

    return(
        <button className="btn btn-grad" onClick={logOutHandler}>
            Log Out
        </button>
    )
}

export default LogoutButton;