"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./category.module.css";
import callApi from "@/api";
import api from "@/api";
import { hero_data } from "@/data/data";
import Cards from "../../components/cards/cards";
import { useSearchParams, usePathname } from "next/navigation";
// import CircularProgress from "@mui/joy/CircularProgress";
import img from "../../../public/images/brownCake.png";
import Sidefilter from "@/components/sidefilter/sidefilter";

const CollectionName = (props: any) => {
  // const router: any = useRouter();

  const [products, setProducts]: any = useState([]);

  const [loading, setLoading] = useState(true);
  const searchParams: any = useSearchParams();
  console.log(searchParams.get("category"));
  useEffect(() => {
    getProducts();
  }, [searchParams.get("category")]);

  const checkForQuery = () => {
    // base query
    let query_string = `identifier=${process.env.NEXT_PUBLIC_IDENTIFIER}`;

    if ([...searchParams.keys()].length) {
      [...searchParams.keys()].forEach((val: any) => {
        query_string += `&${String(val).toLowerCase()}=${searchParams.get(
          val
        )}`;
      });
    } else {
      console.log("we don't have a query");
    }

    console.log("final value of object is ::: ", query_string);
    return query_string;
  };

  const getProducts = () => {
    console.log(checkForQuery());
    setLoading(true);
    api({
      url: `products/filter?${checkForQuery()}`,
      method: "GET",
    })
      .then((res) => {
        setProducts([...res.data.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  //   console.log(router.query);

  //   useEffect(() => {
  //     const data = collectionDescription.filter(
  //       (val) => MapCollectionToName(router.query.id) == val.name
  //     );
  //     setCollectionData(data);
  //   }, []);

  //   const [selectedData, setSelectedData] = useState<any>({
  //     productSubGroup3: [],
  //     productSubGroup1: [],
  //     productCollection: [],
  //     productSolution: [],
  //     colors: [],
  //     lengthMin: "",
  //     lengthMax: "",
  //     widthMin: "",
  //     widthMax: "",
  //     heightMin: "",
  //     heightMax: "",
  //     priceMin: "",
  //     priceMax: "",
  //   });

  //   useEffect(() => {
  //     let temp = { ...selectedData };
  //     console.log(router.query);
  //     if (Object.keys(router.query).length !== 0) {
  //       if (router.query?.productSubGroup3) {
  //         temp.productSubGroup3 = [
  //           // @ts-ignore
  //           ...router?.query?.productSubGroup3?.split(","),
  //         ];
  //       }
  //       if (router.query?.productSubGroup1) {
  //         // @ts-ignore
  //         temp.productSubGroup1 = [...router?.query?.productSubGroup1.split(",")];
  //       }
  //       if (router.query?.productCollection) {
  //         temp.productCollection = [
  //           // @ts-ignore
  //           ...router?.query?.productCollection.split(","),
  //         ];
  //       }

  //       if (router?.query?.productSolution) {
  //         // @ts-ignore
  //         temp.productSolution = [...router?.query?.productSolution.split(",")];
  //       }

  //       if (router?.query?.colors) {
  //         // @ts-ignore
  //         temp.colors = [...router?.query?.colors.split(",")];
  //       }
  //       if (router?.query?.lengthMin) {
  //         temp.lengthMin = router?.query?.lengthMin;
  //       }
  //       if (router?.query?.lengthMax) {
  //         temp.lengthMax = router?.query?.lengthMax;
  //       }
  //       if (router?.query?.widthMin) {
  //         temp.widthMin = router?.query?.widthMin;
  //       }
  //       if (router?.query?.widthMax) {
  //         temp.widthMax = router?.query?.widthMax;
  //       }
  //       if (router?.query?.widthMax) {
  //         temp.widthMax = router?.query?.widthMax;
  //       }
  //       if (router?.query?.heightMin) {
  //         temp.heightMin = router?.query?.heightMin;
  //       }
  //       if (router?.query?.heightMax) {
  //         temp.heightMax = router?.query?.heightMax;
  //       }
  //       if (router?.query?.priceMin) {
  //         temp.priceMin = router?.query?.priceMin;
  //       }
  //       if (router?.query?.priceMax) {
  //         temp.priceMax = router?.query?.priceMax;
  //       }
  //       console.log(temp);
  //       FunctionForFilter(temp);
  //       setSelectedData({
  //         ...temp,
  //       });
  //     } else {
  //       FunctionForFilter(null);
  //       setSelectedData({
  //         productSubGroup3: [],
  //         productSubGroup1: [],
  //         productCollection: [],
  //         productSolution: [],
  //         colors: [],
  //         lengthMin: "",
  //         lengthMax: "",
  //         widthMin: "",
  //         widthMax: "",
  //         heightMin: "",
  //         heightMax: "",
  //         priceMin: "",
  //         priceMax: "",
  //       });
  //     }
  //   }, [router.query]);

  //   const FunctionForFilter = (temp: any) => {
  //     console.log(temp);
  //     // let params = new URLSearchParams();
  //     let q_str = "";
  //     if (temp != null)
  //       for (const key in temp) {
  //         if (
  //           key == "productSubGroup1" ||
  //           key == "productSubGroup3" ||
  //           key == "productCollection" ||
  //           key == "productSolution" ||
  //           key == "colors"
  //         ) {
  //           // @ts-ignore

  //           if (temp[key].length > 0) {
  //             // @ts-ignore
  //             console.log(temp[key][0]);

  //             for (let i = 0; i < temp[key].length; i++) {
  //               // params.append(`${key}[]`, temp[key][i]);
  //               q_str += `${key}[]=${temp[key][i]}&`;
  //             }
  //           }
  //         } else {
  //           if (temp[key] != "") {
  //             // params.append(key, temp[key]);
  //             q_str += `${key}=${temp[key]}&`;
  //           }
  //         }
  //         // return params;
  //         // const queryString = params.toString();

  //         getData(q_str);
  //       }
  //     else {
  //       getData("");
  //     }
  //   };

  //   const getData = (queryString: string) => {
  //     // setloader(true)
  //     console.log(queryString);
  //     callApi({
  //       method: "GET",
  //       // @ts-ignore
  //       Url: `/v1/products/filter?productCollection[]=${
  //         router.query.id
  //       }&${queryString
  //         ?.split("")
  //         ?.slice(0, queryString.split("").length - 1)
  //         ?.join("")}`,
  //       data: "",
  //       headers: "",
  //     })
  //       .then((res: any) => {
  //         console.log(queryString);
  //         console.log(res.data.data);
  //         setCollectionItem(res?.data?.data);
  //         sortProducts(res.data.data);
  //         //  setproductLoader(false);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  const [selectedData, setSelectedData] = useState<any>({
    productSubGroup3: [],
    productSubGroup1: [],
    productCollection: [],
    productSolution: [],
  });
  return (
    <>
      {false ? (
        // <Loader />
        <></>
      ) : (
        <div>
          <div className={styles.hero}>
            <Image
              src={hero_data[searchParams.get("category")].img}
              alt="..."
              width={500}
              height={500}
            />
            <div className={styles.red_card}>
              <span>
                <h2>{hero_data[searchParams.get("category")].heading}</h2>
                <p>{hero_data[searchParams.get("category")].content}</p>
              </span>
            </div>
          </div>

          <div className={styles.product_main}>
            <div className={styles.side_dropdown}>
              <Sidefilter
                selectedData={selectedData}
                setSelectedData={setSelectedData}
              />
            </div>
            {products?.length > 0 ? (
              <div className={styles.all_cards}>
                {products?.map((item: any, index: any) => (
                  <Cards data={item} type="product_card" key={index} />
                ))}
              </div>
            ) : (
              <div className={styles.noProduct}>
                {" "}
                <h3>No Product Found</h3>{" "}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionName;
