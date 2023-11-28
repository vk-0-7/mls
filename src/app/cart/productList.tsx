"use client";
import { useCartContext } from "@/context/cartContext";
import styles from "./productList.module.css";
import React from "react";
import Image from "next/image";
import Delete from "@/assets/Icons/trash.svg";
import Add from "@/assets/Icons/add.svg";
import Minus from "@/assets/Icons/minus.svg";
import { numToString } from "@/utils/utils";

const ProductList = () => {
  const { cart, deleteFromCart, updateCart }: any = useCartContext();

  return (
    <ul className={styles.container}>
      {cart.map((item: any, index: any) => {
        return (
          <li key={index} className={styles.product}>
            <div className={styles.left}>
              <div className={styles.img}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE}${item.productId.mediaUrl[0]}`}
                  alt={item.productId.title}
                  fill={true}
                />
              </div>
              <div className={styles.about_product}>
                <p className={styles.product_category}>
                  {item.productId.category}
                </p>
                <h2>{item.productId.title}</h2>
                {/* {item.variant.length !== 0 && (
                  <ul className={styles.variants}>
                    {item.variant.map((val: any, index: any) => {
                      return (
                        <li key={index}>
                          {val.options_name} : {val.options_value}
                        </li>
                      );
                    })}
                  </ul>
                )} */}

                <div className={styles.quantity_container}>
                  <div
                    className={`${styles.qc_decrease}`}
                    onClick={() => {
                      updateCart({
                        index,
                        type: "decrease",
                        id: item.productId._id,
                      });
                    }}
                  >
                    <Minus />
                  </div>
                  <div className={styles.qc_value}>
                    {numToString(item.quantity, 2)}
                  </div>
                  <div
                    className={styles.qc_increase}
                    onClick={() => {
                      updateCart({
                        index,
                        type: "increase",
                        id: item.productId._id,
                      });
                    }}
                  >
                    <Add />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <h2>₹{item.productId.pricing.price * item.quantity}</h2>
              <Delete
                onClick={() => {
                  deleteFromCart({ id: item.productId._id, index });
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductList;
