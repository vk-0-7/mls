import React from "react";
import CircularProgress from "@mui/joy/CircularProgress";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "absolute",
        top: "0px",
        left: "0px",
        backgroundColor: "var(--primary)",
        display: "grid",
        placeItems: "center",
        zIndex: "10000",
      }}
    >
      <CircularProgress color="primary" thickness={4} size="lg" />
    </div>
  );
};

export default Loader;
