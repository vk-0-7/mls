"use client";
import api from "@/api";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext({});

function ContextProvider({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories]: any = useState([]);
  const [specifications, setSpecifications]: any = useState([{}]);

  const value = {
    categories,
    specifications,
  };

  const getCategories = () => {
    console.log("fetching categories");
    api({
      url: `products/categoryList/${process.env.NEXT_PUBLIC_IDENTIFIER}`,
      method: "GET",
    })
      .then((res: any) => {
        console.log(res.data.data[0].distinctCategory);
        setCategories([...res.data.data[0].distinctCategory]);
        getSpecifications();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSpecifications = () => {
    console.log("fetching specifications");
    api({
      url: `products/getSpecificationData/${process.env.NEXT_PUBLIC_IDENTIFIER}`,
      method: "GET",
    })
      .then((res) => {
        let temp = res.data.filter((val: any) => val._id !== "Weight");

        setSpecifications([...temp]);

        setLoading(false);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Context.Provider value={value}>
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="loader"></span>
        </div>
      ) : (
        children
      )}
    </Context.Provider>
  );
}

const useAppContext = () => useContext(Context);

export { Context, useAppContext, ContextProvider };
