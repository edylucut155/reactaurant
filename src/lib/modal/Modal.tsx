import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const MODAL_STYLES: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#242424",
    padding: "20px",
    zIndex: 1000,
};

const OVERLAY_STYLE: React.CSSProperties = {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
};

const Modal = (props: {
    isOpen: boolean;
    close: Function;
    children: ReactNode;
}): React.ReactPortal | null => {
    if (props.isOpen) {
        return ReactDOM.createPortal(
            <div>
                <div
                    style={OVERLAY_STYLE}
                    className="modal-backdrop"
                    onClick={() => props.close()}
                />
                <div style={MODAL_STYLES} className="modal-child">
                    <div
                        className="btn-square btn-close btn-grad"
                        onClick={() => props.close()}
                    >
                        <i style={{ position: 'absolute' }} className="fas fa-times"></i>
                    </div>
                    {props.children}
                </div>
            </div>,
            document.getElementById("portal") as Element
        );
    } else {
        return null;
    }
};

export default Modal;