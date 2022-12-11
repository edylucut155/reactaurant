import React from "react";
import DeleteTable from "./DeleteTable";
import EditTable from "./EditTable";

const TableControls = (props: {
  onEdit: Function;
  onDelete: Function;
  table: {
    id: string;
    name: string;
    capacity: number;
  };
}) => {
  return (
    <div className="mt-10 d-flex">
      <EditTable table={props.table} onEdit={props.onEdit} />
      <DeleteTable id={props.table.id} onDelete={props.onDelete} />
    </div>
  );
};

export default TableControls;
