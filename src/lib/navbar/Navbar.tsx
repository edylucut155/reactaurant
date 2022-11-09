import React, { Dispatch, SetStateAction, FC } from "react";
import { AuthModals } from "../../components/auth/types";

const Navbar: FC<{ setModalOpen: Dispatch<SetStateAction<AuthModals>>; }> = ({
    setModalOpen,
}) => {
    return (
        <>
            <div className="board-content d-flex mt-10">
                <button className="btn-grad" onClick={() => setModalOpen(AuthModals.SIGNUP)}>Log In</button>
                <button className="btn-grad" onClick={() => setModalOpen(AuthModals.REGISTER)}>
                    Register
                </button>
            </div>
        </>
    );
};

export default Navbar;