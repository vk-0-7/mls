"use client";

import api from "@/api";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const cartContext = createContext({});

const CartContextProvider = ({ children }: any) => {
  const [cart, setCart]: any = useState([]);
  const [cartId, setCartId]: any = useState("");

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    // if user is not logged in then get cart from local storage
    if (localStorage.getItem("session_token")) {
      api({
        url: `carts/${localStorage.getItem("user_id")}`,
        method: "GET",
      })
        .then((res) => {
          setCart([...res.data.cart.products]);
          setCartId(res.data.cart._id);
          localStorage.setItem(
            "PETITE_CART",
            JSON.stringify(res.data.cart.products)
          );
        })
        .catch((error) => {
          console.log("error fetching cart", error);
        });
    }
    // if user is logged in then get cart from server
    else {
      setCart(JSON.parse(localStorage.getItem("PETITE_CART") || "[]"));
    }
  };

  const deleteFromCart = ({ id, index }: { id?: string; index?: any }) => {
    // if user is not logged in then delete from local storage cart
    if (localStorage.getItem("session_token")) {
      toast.promise(
        new Promise((resolve, reject) => {
          api({
            url: "carts/removeCartItem",
            method: "PATCH",
            data: {
              userId: localStorage.getItem("user_id"),
              productId: id,
            },
          })
            .then(() => {
              getCart();
              resolve(true);
            })
            .catch(() => reject(false));
        }),
        {
          loading: "Removing from cart...",
          success: "Product removed from cart.",
          error: "Error removing product from cart.",
        }
      );
    }
    // if user is logged in then delete from server cart
    else {
      const temp_cart = [...cart];
      temp_cart.splice(index, 1);
      localStorage.setItem("PETITE_CART", JSON.stringify(temp_cart));
      setCart([...temp_cart]);
      toast.success("Removed from cart");
    }
  };

  const addToCart = (data: any, quantity: any) => {
    const date = new Date();
    const year = date.getFullYear();
    const month =
      String(date.getMonth() + 1).length === 1
        ? "0" + String(date.getMonth() + 1)
        : String(date.getMonth() + 1);
    const day =
      String(date.getDate()).length === 1
        ? "0" + String(date.getDate())
        : String(date.getDate());

    // if user is not logged in then add to local storage cart
    if (localStorage.getItem("session_token")) {
      toast.promise(
        new Promise((resolve, reject) => {
          api({
            url: `carts`,
            method: "post",
            data: {
              identifier: process.env.NEXT_PUBLIC_IDENTIFIER,
              userId: localStorage.getItem("user_id"),
              products: [
                {
                  productId: data._id,
                  quantity: quantity,
                  date: `${year}-${month}-${day}`,
                },
              ],
            },
          })
            .then((res) => {
              getCart();
              resolve(res);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        }),
        {
          loading: "Adding to cart...",
          success: "Product Added to cart.",
          error: "Error adding product to cart.",
        }
      );
    }
    // if user is logged in then don't need to do anything because we can call getCart() to get updated cart from server
    else {
      const temp_cart_data = {
        productId: data,
        quantity: quantity,
        date: `${year}-${month}-${day}`,
      };

      const temp_cart = [...cart, temp_cart_data];

      localStorage.setItem("PETITE_CART", JSON.stringify(temp_cart));
      setCart([...temp_cart]);
      toast.success("Added to cart");
    }
  };

  const updateCart = ({
    id,
    index,
    type,
  }: {
    id?: string;
    index?: any;
    type: "increase" | "decrease";
  }) => {
    // if user is not logged in then update local storage cart
    if (localStorage.getItem("session_token")) {
      // find product with the id
      const product = cart.find((item: any) => item.productId._id === id);

      api({
        url: "carts/" + localStorage.getItem("user_id"),
        method: "PATCH",
        data: {
          productId: id,
          quantity: product.quantity + (type === "increase" ? 1 : -1),
        },
      })
        .then(() => {
          getCart();
        })
        .catch(() => {
          toast.error("Error while updating quantity.");
        });
    }
    // if user is logged in then update server cart
    else {
      const temp_cart = [...cart];
      temp_cart[index].quantity =
        type === "increase"
          ? temp_cart[index].quantity + 1
          : temp_cart[index].quantity - 1;

      if (temp_cart[index].quantity === 0) {
        deleteFromCart({ index });
        return;
      }

      localStorage.setItem("PETITE_CART", JSON.stringify(temp_cart));
      setCart([...temp_cart]);
    }
  };

  const localToCloud = () => {
    if (cart.length !== 0) {
      // upload cart to server
      api({
        url: "carts",
        method: "POST",
        data: {
          identifier: process.env.NEXT_PUBLIC_IDENTIFIER,
          userId: localStorage.getItem("user_id"),
          products: cart.map((item: any) => {
            return {
              productId: item.productId._id,
              quantity: item.quantity,
              date: item.date,
              variant: item.variant,
            };
          }),
        },
      })
        .then(() => {})
        .catch(() => {
          toast.error("Error syncing cart with server");
        });
    }
  };

  const value = {
    cart,
    getCart,
    deleteFromCart,
    addToCart,
    updateCart,
    localToCloud,
    cartId,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

const useCartContext = () => useContext(cartContext);

export { CartContextProvider, useCartContext };
