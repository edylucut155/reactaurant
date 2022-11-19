import React, { FC, Dispatch, SetStateAction, SyntheticEvent } from "react";
import { AuthModals, User } from "./types";
import './auth-styles.css';
import { useUserAuth } from "../../contexts/AuthContext";
import useUserDetails from "../../hooks/UserDetailsHook";
import { whereQuery } from "../../configs/firebase/actions";
import { useNavigate } from "react-router-dom";
import { PagesPaths } from "../../pages/types";
import { ToastVariants, useToast } from "../../contexts/ToastContext";

const SignIn: FC<{ setModalOpen: Dispatch<SetStateAction<AuthModals>>; }> = ({
    setModalOpen,
}) => {

    const { logIn } = useUserAuth();
    const { storeCurrentUserDetails } = useUserDetails();
    const navigate = useNavigate();
    const { enqueueToast } = useToast();

    const onSubmit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const target = e.target as typeof e.target & {
                [key: string]: { value: string; };
            };
            const email = target.email.value;
            const password = target.password.value;
            const userCredentials = await logIn(email,password);
            const usersQueryResults = await whereQuery(
                "users",
                "userId",
                userCredentials.user.uid
            );
            storeCurrentUserDetails(usersQueryResults[0] as unknown as User);
            setModalOpen(AuthModals.CLOSED);
            navigate(PagesPaths.DASHBOARD);
            enqueueToast({
                id:"loginSuccessToast",
                message:'Signed in successfully',
                variant:ToastVariants.SUCCESS
            })
        } catch (err) {
            setModalOpen(AuthModals.CLOSED);
            console.error(err);
            enqueueToast({
                id:"loginErrorToast",
                message:'Could not sign in',
                variant:ToastVariants.ERROR
            });
            setModalOpen(AuthModals.CLOSED);
        }

    };
    return (
        <div className="modal-well">
            <div className="h-inset">
                <h2 className="title-style">Login</h2>
            </div>
            <form className="auth-form" onSubmit={onSubmit}>
                <div className="d-flex">
                    <i className="fa-solid fa-envelope bg-secondary"></i>
                    <input
                        className="style-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                    />
                </div>
                <div className="d-flex">
                    <i className="fa-solid fa-lock bg-secondary"></i>
                    <input
                        className="style-input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                </div>
                <input className="btn btn-grad" type="submit" value="Sign in" />
            </form>
        </div>
    );
};

export default SignIn;