"use client";
import React from "react";
import styles from "./cart.module.css";
import ProductList from "./productList";
import Retaino from "@/components/third-party/Retaino";
import { useKeyContext } from "@/components/third-party/context/keyContext";
import { useCartContext } from "@/context/cartContext";
import toast from "react-hot-toast";
import axios from "axios";

const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { key } = useKeyContext();
  const { cart, cartId }: any = useCartContext();

  const handleCheckout = () => {
    if (localStorage.getItem("session_token") === null) {
      toast.error("Please login to continue");
    } else {
      setLoading(true);

      axios({
        url: "https://backend.cftcommerce.com/api/carts/retainocheckout",
        method: "POST",
        data: {
          key,
          userId: localStorage.getItem("user_id"),
          order: {
            cartId,
            orderStatus: false,
            paymentStatus: false,
          },
          products: cart.map((item: any) => ({
            productId: item.productId._id,
            productName: item.productId.title,
            productSpecification: changeSpec(item.variant),
            productMediaUrl:
              process.env.NEXT_PUBLIC_IMAGE + item.productId.mediaUrl[0],
            productQuantity: item.quantity,
            productPrice: item.productId.pricing.price,
            productTax: item.productId.pricing.cgst,
          })),
        },
      })
        .then((res) => {
          setUrl(res.data.url);
          setLoading(false);
          setOpen(true);
        })
        .catch(() => {
          setLoading(false);
          toast.error("Error while placing order");
        });
    }
  };

  const changeSpec = (spec: any) => {
    const temp: any = {};

    if (spec.length !== 0) {
      spec.forEach((item: any) => {
        temp[item.options_name] = item.options_value[0];
      });

      return temp;
    }

    return {};
  };

  return (
    <>
      <Retaino
        type="checkout"
        open={open}
        url={url}
        onClose={() => setOpen(false)}
      />
      <div className={styles.container}>
        <div className={styles.head}>
          <h1>Shopping Cart</h1>
          {loading ? (
            <div className={styles.loading_btn}>
              <span></span>
            </div>
          ) : (
            <button onClick={handleCheckout}>Proceed To Buy</button>
          )}
        </div>
        <ProductList />
      </div>
    </>
  );
};

export default Cart;
