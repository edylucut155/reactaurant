import { FC, Fragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../contexts/AuthContext";
import useUserDetails from "../hooks/UserDetailsHook";
import { PagesPaths } from "../pages/types";

const ProtectedRoute: FC<{children: ReactNode}> = ({children}) => {
    const {getCurrentUserDetails} = useUserDetails();
    const { user: userAuthData } = useUserAuth();
    const userDetails = getCurrentUserDetails();

    if(Object.keys(userAuthData).length > 0 && !userDetails) return <div>Loading...</div>;

    if(Object.keys(userAuthData).length > 0 && userDetails) return <Fragment>{children}</Fragment>;

    return <Navigate to={PagesPaths.LANDING}></Navigate>
}

export default ProtectedRoute;