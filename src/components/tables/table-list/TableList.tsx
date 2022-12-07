import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTables } from "../table/actions";
import Table from "../table/Table";

const TablesList = (props: {
    tables?: DocumentData[];
    withFetch: boolean;
    onEdit?: Function;
    onDelete?: Function;
}) => {
    const [loading, setLoading] = useState(true);
    const [tables, setTables] = useState<DocumentData[]>([]);
    const { id } = useParams();

    useEffect(() => {
        if (props.withFetch && id) {
            fetchTables(id).then((data) => {
                setLoading(false);
                setTables(data);
            })
        }
    }, []);

    if (props.withFetch && loading) {
        return <div className="mt-10">Loading...</div>
    }

    const tablesList = props.withFetch ? tables : props.tables;

    if(!tablesList || tablesList.length === 0) {
        return <div className="mt-10">There are no tables added.</div>
    }

    return (
        <div className="mt-10">
            {tablesList.map((table) => (
                <Table
                    key={table.id}
                    id={table.id}
                    name={table.name}
                    capacity={table.capacity}
                    withControls={!props.withFetch}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}
                ></Table>
            ))}
        </div>
    )
}

export default TablesList;