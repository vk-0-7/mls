"use client";
import React, { useEffect, useState } from "react";
import styles from "./products.module.css";
import ProductImages from "@/components/carousel/productCarousel";
// import Button from "@/components/button";
import api from "@/api";
import { useCartContext } from "@/context/cartContext";
import { numToString } from "@/utils/utils";
import Add from "@/assets/Icons/add.svg";
import Minus from "@/assets/Icons/minus.svg";
import toast from "react-hot-toast";
// import SimilarProducts from "./similarProducts";
import { useRouter } from "next/navigation";
import Retaino from "@/components/third-party/Retaino";
import Head from "next/head";
import type { Metadata } from "next";
import Script from "next/script";

const ProductDetail = (props: any) => {
//   console.log(props.data);
  const cart: any = useCartContext();
  const [loading, setLoading] = useState(true);
  const [data, setData]: any = useState({});
  const [variants, setVariants]: any = useState({});
  const [quantity, setQuantity] = useState(1);
  const [alreadyAddedToCart, setAlreadyAddedToCart] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    checkForCart();
  }, [cart.cart]);

  const getProductData = () => {
    setData(props?.data);
    setLoading(false);
    // for (let i = 0; i < props?.data.variant.length; i++) {
    //   setVariants((prev: any) => {
    //     return {
    //       ...prev,
    //       [props?.data.variant[i].options_name]: "",
    //     };
    //   });
    // }
    // setLoading(false);

    // api({
    //   url: `products/${process.env.NEXT_PUBLIC_IDENTIFIER}/${props.id}`,
    //   method: "GET",
    // })
    //   .then((res: any) => {
    //     setData(res.data.product[0]);

    //     setLoading(false);

    //     for (let i = 0; i < res.data.product[0].variant.length; i++) {
    //       setVariants((prev: any) => {
    //         return {
    //           ...prev,
    //           [res.data.product[0].variant[i].options_name]: "",
    //         };
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //   });
  };

  //   const checkForVariants = () => {
  //     const keys = Object.keys(variants);

  //     if (keys.length === 0) {
  //       return true;
  //     }

  //     for (let i = 0; i < keys.length; i++) {
  //       if (!variants[keys[i]]) {
  //         return false;
  //       }
  //     }

  //     return true;
  //   };

  const addToCart = () => {
    //     if (!checkForVariants()) {
    //       toast.error("Please select all variants");
    //       return;
    //     } else {
    //       cart.addToCart(data, variants, quantity);
    //     }
  };

  const checkForCart = () => {
    // console.log(cart.cart);
    // let found = cart.cart.find((val: any) => {
    //   return val.productId?.seListing?.routeHandle === props.id;
    // });
    // if (found !== undefined) {
    //   setAlreadyAddedToCart(true);
    // } else {
    //   setAlreadyAddedToCart(false);
    // }
  };

  const handleBuyBtn = () => {
    // if (localStorage.getItem("session_token")) {
    // } else {
    //   cart.addToCart(data, variants, quantity);
    //   setModal(true);
    // }
  };

  const handleLogin = (session: string) => {
    const sessionObj = JSON.parse(session);
    localStorage.setItem("session_token", sessionObj.session);
    localStorage.setItem("user_id", sessionObj.userId);
    cart.localToCloud();
    router.push("/cart");
  };

  //   const addProductJsonLd = () => {
  //     return {
  //       __html: `{
  //         "@type": "Product",
  //       }`,
  //     };
  //   };
  console.log(data);
  return (
    <>
      {/* <Head>
        <script
          type="application/ld+json"
          key="product-jsonld"
          dangerouslySetInnerHTML={addProductJsonLd()}
        ></script>
      </Head> */}
      <Retaino
        type={"login"}
        open={modal}
        onClose={() => setModal(false)}
        onLogin={handleLogin}
      />
      {loading ? (
        <div
          style={{
            height: "calc(100vh - 160px)",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="loader"></span>
        </div>
      ) : (
        <div>
          <div className={styles.main}>
            <div className={styles.details}>
              <div className={styles.heading}>
                <span>{data.category}</span>
                <h1>{data?.title}</h1>
              </div>

              <div className={styles.description}>
                <h3>description</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.description.replace(/&nbsp;/g, " "),
                  }}
                ></p>
              </div>

              {data.specifications.length !== 0 && (
                <div className={styles.specification}>
                  <h3>specification</h3>
                  <ul>
                    {data.specifications.map((val: any, index: any) => {
                      return (
                        <li key={index}>
                          <span>{val.options_name} : </span>
                          <span>
                            {val.options_value.length === 1
                              ? val.options_value[0]
                              : val.options_value.join(", ")}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.carousel}>
              <div className={styles.mob_heading}>
                <span>{data.category}</span>
                <h1>{data.title}</h1>
              </div>
              <ProductImages
                data={data.mediaUrl.map(
                  (val: any) => `${process.env.NEXT_PUBLIC_IMAGE}${val}`
                )}
              />
            </div>
            <div className={styles.actions}>
              {/* {data.variant.length !== 0 && (
                <div className={styles.variants_main}>
                  <div className={styles.variants_container}>
                    {data.variant.map((val: any, index: any) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                          }}
                        >
                          <p
                            style={{
                              textTransform: "capitalize",
                              color: "grey",
                            }}
                          >
                            {val.options_name}
                          </p>
                          <div className={styles.variant} key={index}>
                            <select
                              style={{ textTransform: "capitalize" }}
                              onChange={(e) => {
                                setVariants((prev: any) => {
                                  return {
                                    ...prev,
                                    [val.options_name]: e.target.value,
                                  };
                                });
                              }}
                            >
                              <option value={""} selected disabled>
                                {val.options_name}
                              </option>
                              {val.options_value.map((val: any, index: any) => {
                                return (
                                  <option key={index} value={val}>
                                    {val}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )} */}

              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <p style={{ color: "grey" }}>Quantity:</p>
                <div className={styles.quantity_container}>
                  <div
                    className={`${styles.qc_decrease} ${
                      quantity === 1 && styles.qc_fade
                    }`}
                    onClick={() => {
                      if (quantity > 1) setQuantity((prev) => prev - 1);
                    }}
                  >
                    <Minus />
                  </div>
                  <div className={styles.qc_value}>
                    {numToString(quantity, 2)}
                  </div>
                  <div
                    className={styles.qc_increase}
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <Add />
                  </div>
                </div>
              </div>

              <h2>₹{data.pricing.price}</h2>

              <div>
                <span className={styles.offer}>Offer : </span>{" "}
                <span className={styles.coupon}>
                  Coupon Title - COUPON_CODE
                </span>
              </div>

              <button className={styles.buy_btn} onClick={handleBuyBtn}>
                Buy Now
              </button>
              <button
                onClick={() => {
                  if (alreadyAddedToCart) {
                    router.push("/cart");
                  } else {
                    addToCart();
                  }
                }}
                className={styles.cart_btn}
              >
                {alreadyAddedToCart ? "GO TO CART" : "ADD TO CART"}
              </button>
            </div>
          </div>

          {/* <SimilarProducts category={data.category} id={data._id} /> */}
        </div>
      )}
    </>
  );
};

async function getData(params: any) {
  console.log("********", params);
}

export default ProductDetail;
