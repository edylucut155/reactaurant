import React, { useState } from "react";
import { set } from "../../../../configs/firebase/actions";
import Modal from "../../../../lib/modal/Modal";
import TableForm from "../../table-form/TableForm";
import { TableData } from "../types";

const EditMenuItem = (props: {
    onEdit: Function;
    table: {
        id: string;
        name: string;
        capacity: number;
    }
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const clickHandler = () => setIsModalOpen(true);
    const modalCloseHandler = () => setIsModalOpen(false);

    const editTable = (data: TableData) => {
        set("tables", props.table.id, data).then(() => {
            setIsModalOpen(false);
            props.onEdit({ id: props.table.id, ...data});
        });
    }

    return (
        <div>
            <button className="btn btn-grad" onClick={clickHandler}>Edit</button>
            <Modal isOpen={isModalOpen} close={modalCloseHandler}>
                <h2>Edit Menu Item</h2>
                <TableForm onSubmit={editTable} table={props.table}/>
            </Modal>
        </div>
    )
}

export default EditMenuItem;