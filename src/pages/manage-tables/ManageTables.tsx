import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddTable from "../../components/tables/add-table/AddTable";
import TablesList from "../../components/tables/table-list/TableList";
import { fetchTables } from "../../components/tables/table/actions";
import Table from "../../components/tables/table/Table";
import { TableData } from "../../components/tables/table/types";

const ManageTables = () => {
    const [loading, setLoading] = useState(true);
    const [tables, setTables] = useState<DocumentData[]>([]);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchTables(id).then((data) => {
                setTables(data);
                setLoading(false);
            })
        }
    }, []);

    const addTableHandler = (data: TableData) => {
        setTables((prevTables) => [data, ...prevTables]);
    }

    const editTableHandler = (data: TableData) => {
        setTables((prevTables) => {
            const newTables = prevTables.map((table) => {
                if (table.id === data.id) {
                    return data;
                }
                return table;
            })
            return newTables;
        })
    }

    const deleteTableHandler = (id: string) => {
        setTables((prevTables) => {
            const newTables = prevTables.filter((table) => table.id !== id );
            return newTables;
        })
    }

    return (
        <div>
            <AddTable onAdd={addTableHandler}/>
            {!loading && <TablesList tables={tables} withFetch={false} onEdit={editTableHandler} onDelete={deleteTableHandler}/>}
        </div>
    );
}

export default ManageTables;