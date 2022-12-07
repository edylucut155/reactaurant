import React, { useState } from "react";
import { remove } from "../../../../configs/firebase/actions";
import Modal from "../../../../lib/modal/Modal";

const DeleteTable = (props: {onDelete: Function; id: string}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const clickHandler = () => setIsModalOpen(true);
    const modalCloseHandler = () => setIsModalOpen(false);

    const deleteTable = () => {
        remove("tables", props.id).then(() => {
            setIsModalOpen(false);
            props.onDelete(props.id);
        })
    }

    return (
        <div>
            <button  className="btn btn-grad" onClick={clickHandler}>Delete</button>
            <Modal isOpen={isModalOpen} close={modalCloseHandler}>
                <h2>Delete Table</h2>
                <p>Please confirm</p>
                <button onClick={deleteTable}>Delete</button>
            </Modal>
        </div>
    )
}

export default DeleteTable;