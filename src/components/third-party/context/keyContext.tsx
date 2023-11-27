"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const url = "https://backend.cftcommerce.com/api/users/verifyuser";

const KeyContext = createContext({});

const KyeContextProvider = ({ children }: any) => {
  const [key, setKey] = useState("");

  useEffect(() => {
    console.log("getting key");

    axios({
      url,
      method: "POST",
      data: {
        identifier: `${process.env.NEXT_PUBLIC_IDENTIFIER}`,
        consent: true,
      },
    })
      .then((res) => {
        setKey(res.data.key);
      })
      .catch((error) => {
        console.log("error response ::: ", error);
      });
  }, []);

  return <KeyContext.Provider value={{ key }}>{children}</KeyContext.Provider>;
};

const useKeyContext = (): any => useContext(KeyContext);

export { KyeContextProvider, useKeyContext };
