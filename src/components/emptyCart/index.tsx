import React from "react";
import styles from "./emptyCart.module.css";
import Cross from "@/assets/Icons/cross.svg";

type Props = {
  open: boolean;
  onClose: () => void;
};

const EmptyCart = (props: Props) => {
  return (
    <>
      <div
        className={`${styles.container} ${props.open && styles.container_open}`}
      >
        <div>
          <h4>Your cart is empty</h4>
          <p>back to shopping</p>
          <Cross onClick={props.onClose} />
        </div>
      </div>
      {props.open && (
        <div className={styles.close} onClick={props.onClose}></div>
      )}
    </>
  );
};

export default EmptyCart;
