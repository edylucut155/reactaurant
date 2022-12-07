import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { add } from "../../../configs/firebase/actions";
import Modal from "../../../lib/modal/Modal";
import TableForm from "../table-form/TableForm";
import { TableData } from "../table/types";

const AddTable = (props: {onAdd: Function}) => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const clickHandler = () => setIsModalOpen(true);
    const modalCloseHandler = () => setIsModalOpen(false);

    const addTable = (data: TableData) => {
        add("tables", {
            ...data,
            restaurantId: id
        }).then((tables) => {
            setIsModalOpen(false);
            props.onAdd({...data, id: tables.id});
        });
    }

    return (
        <div>
            <button className="btn btn-grad" onClick={clickHandler}>Add Table</button>
            <Modal isOpen={isModalOpen} close={modalCloseHandler}>
                <h2>Add Table</h2>
                <TableForm onSubmit={addTable}/>
            </Modal>
        </div>
    )
}

export default AddTable;