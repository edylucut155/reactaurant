import React, { FC, Dispatch, SetStateAction, SyntheticEvent } from "react";
import { AuthModals } from "./types";
import './auth-styles.css';

const SignIn: FC<{ setModalOpen: Dispatch<SetStateAction<AuthModals>>; }> = ({
    setModalOpen,
}) => {
    const onSubmit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const target = e.target as typeof e.target & {
                [key: string]: { value: string; };
            };
            const email = target.email.value;
            const password = target.password.value;

            setModalOpen(AuthModals.CLOSED);
        } catch (err) {
            console.error(err);
            alert(err);
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
                        required
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
                        required
                    />
                </div>
                <input className="btn btn-grad" type="submit" value="Sign in" />
            </form>
        </div>
    );
};

export default SignIn;