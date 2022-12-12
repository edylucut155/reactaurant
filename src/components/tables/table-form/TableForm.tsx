import React, { SyntheticEvent } from "react";
import Input from "../../../lib/form/Input";

const TableForm = (props: {
  onSubmit: Function;
  table?: {
    name: string;
    capacity: number;
  };
}) => {
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      [key: string]: {
        value: string;
      };
    };

    const tableData = {
      name: target.name.value,
      capacity: +target.capacity.value,
    };

    props.onSubmit(tableData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <Input
          name="name"
          type="text"
          label="Name"
          value={props.table?.name || ""}
        ></Input>
      </div>
      <div className="mt-10">
        <Input
          name="capacity"
          type="number"
          label="Capacity"
          value={props.table?.capacity as unknown as string}
        ></Input>
      </div>
      <div className="mt-10">
        <button className="btn-grad mx-auto">
          {props.table ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default TableForm;
