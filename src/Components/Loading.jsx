import React from "react";
import { trefoil } from "ldrs";

trefoil.register();

function Loading(props) {
  return (
    <div
      className="loading"
      style={{
        backgroundColor: props.tr ? "#000000ee" : "var(--White)",
        width: props.exp ? "100vw" : "calc(100vw - 425px)",
        height: props.exp ? "100vh" : "calc(100vh - 4rem)",
        top: props.exp && "0",
      }}
    >
      <l-trefoil
        size="120"
        stroke="5"
        stroke-length="0.15"
        bg-opacity="0.2"
        speed="1.4"
        color="var(--Prcl)"
      ></l-trefoil>
      <h2>Loading...</h2>
    </div>
  );
}

// Default values shown

export default Loading;
