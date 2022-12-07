import React from "react";
import classes from "./Table.module.css";

const Chairs = ({ size, fontSize, style}:{size: number; fontSize: number; style: Object;}) => {
    return (
        <div className={classes.chairs} style={{height: fontSize + 5}}>
            {
                [...Array(size).keys()].map((index) => {
                    return <div key={`chairs-${index}`} style={style}>
                        <i className="fa-solid fa-chair"></i>
                    </div>
                })
            }
        </div>
    )
}

export default Chairs;