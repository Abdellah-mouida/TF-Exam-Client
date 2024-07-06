import React, { useState } from "react";

function Popup(props) {
  return (
    <div
      className="popup"
      style={{
        backgroundColor: props?.state === "succss" ? "#0ebd0e" : "#ff2020",
        right: props?.show ? "50px" : "-100%",
      }}
    >
      <header>
        {props?.state === "succss" ? (
          <>
            <i className="fa-solid fa-check"></i> Succss
          </>
        ) : (
          <>
            <i className="fa-solid fa-circle-exclamation"></i> Error
          </>
        )}
      </header>
      <p>{props.message} </p>
    </div>
  );
}

export default Popup;
