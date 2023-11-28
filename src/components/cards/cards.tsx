import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Add from "@/assets/Icons/add.svg";
import Minus from "@/assets/Icons/minus.svg";
import { useCartContext } from "@/context/cartContext";
// import oreenlogo from "../../public/Images/product_logo.webp";
// import noimage from "../../public/Images/noimage.webp";
import styles from "./cards.module.css";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { capatalize, cropString } from "@/utils/utils";
// import { titleCase } from "@/utils";

const cards = ({ data, type }: any) => {
  const { cart, deleteFromCart, updateCart }: any = useCartContext();

  const router = useRouter();
  console.log("received data : :: : : ", type, data);
  return (
    <div>
      {type == "normal_card" && (
        <div className={styles.card_main}>
          <div className={styles.cardImage}>
            {" "}
            <Image src={data?.img} alt="..." height={500} width={500} />{" "}
          </div>
        </div>
      )}
      {type == "product_card" && (
        <div
          className={styles.card_main}
          onClick={() => router.push("/" + data?._id)}
        >
          <div className={styles.cardImage}>
            {" "}
            <Image
              src={process.env.NEXT_PUBLIC_IMAGE + data?.mediaUrl[0]}
              alt="..."
              height={500}
              width={500}
              className={styles.img1}
            />{" "}
            <Image
              src={process.env.NEXT_PUBLIC_IMAGE + data?.mediaUrl[1]}
              alt="..."
              height={500}
              width={500}
            />{" "}
          </div>

          <div className={styles.card_about}>
            <div className={styles.card_details}>
              <h5>{capatalize(data?.category)}</h5>
              <h4> ₹{data?.pricing?.price} </h4>
            </div>
            <p>{cropString(data?.title, 25)}</p>
            <div className={styles.btn_group}>
              <div className={styles.quantity_container}>
                <div className={`${styles.qc_decrease} `}>
                  <Minus />
                </div>
                <div className={styles.qc_value}>
                  {/* {numToString(quantity, 2)} */}2
                </div>
                <div
                  className={styles.qc_increase}
                  // onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Add />
                </div>
              </div>
              <button> Add to Cart </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default cards;
