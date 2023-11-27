import React from "react";
import styles from "../styles/Button.module.css";
import { BsArrowRight } from "react-icons/bs";

const Button = ({ text, txtcolor, circlecolor }: any) => {
  return (
    <>
      <button
        className={styles.btn}
        style={{
          display: "flex",
          background: "transparent",
          height: "fit-content",
          width: "fit-content",
          cursor: "pointer",
          padding: "5px",
          color:
            txtcolor == "green"
              ? "var(--main-green-dark)"
              : "var(--main-white-light)",
          gap: "15px",

          border: "none",
          position: "relative",
          // border:"1.5px solid white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {text}

        <div
          className={styles.overlay}
          style={{
            backgroundColor:
              circlecolor == "green"
                ? "var(--main-green-dark) !important"
                : "var(--main-white-light)",
          }}
        ></div>
        <span className={styles.arrow}>
          <BsArrowRight />
        </span>
      </button>
      <style jsx>
        {`
          // button:hover span {
          //   transform: translateX(-120%) !important;
          //   transition: transform 0.2s ease-in-out;
          // }
          // .button:hover button > svg {
          //   transform: translateX(50%) !important;
          //   transition: transform 0.2s ease-in-out;
          // }
        `}
      </style>
    </>
  );
};

export default Button;
