import React from "react";
import Chairs from "./Chairs";
import TableControls from "./controls/TableControls";
import classes from "./Table.module.css";
import NavigateButton from "../../../lib/navigate-button/NavigateButton";
import useUserDetails from "../../../hooks/UserDetailsHook";
import { UserTypes } from "../../auth/types";

const Table = (props: {
  id: string;
  name: string;
  withControls: boolean;
  capacity: number;
  onEdit?: Function;
  onDelete?: Function;
}) => {
  const { id, name, capacity } = props;
  const { getCurrentUserDetails } = useUserDetails();
  const userDetails = getCurrentUserDetails();
  const isClient = userDetails.type === UserTypes.CLIENT;

  const tableWidth = 200;
  let chairFontSize = 40;

  const numOfChairsAbove =
    capacity % 2 === 0 ? capacity / 2 : Math.floor(+capacity / 2) + 1; // Math.ceil

  const numOfChairsBelow = capacity - numOfChairsAbove;

  if (capacity > 1) {
    chairFontSize = tableWidth / capacity;
  }

  const chairStyle = {
    fontSize: chairFontSize,
  };

  const belowChairExtraStyle = {
    paddingTop: 5,
  };

  return (
    <div className="card">
      <Chairs
        size={numOfChairsAbove}
        fontSize={chairFontSize}
        style={chairStyle}
      />
      <div className={classes.table}>
        <span className={classes["table-name"]}>{name}</span>
      </div>
      <Chairs
        size={numOfChairsBelow}
        fontSize={chairFontSize}
        style={{ ...chairStyle, ...belowChairExtraStyle }}
      />
      {props.withControls && props.onEdit && (
        <>
          <hr></hr>
          <TableControls
            onEdit={props.onEdit}
            onDelete={props.onDelete}
            table={{ id, name, capacity }}
          />
        </>
      )}
      {isClient ? (
        <NavigateButton path={`/tables/${id}/reserve`} isSmall={true}>
          Reserve
        </NavigateButton>
      ) : null}
    </div>
  );
};

export default Table;
