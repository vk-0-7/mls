"use client";

import React, { useState, useEffect } from "react";
import styles from "./sidefilter.module.css";
import type { MenuProps } from "antd";
import { Checkbox } from "antd";
import { Menu } from "antd";
import { RxCross2 } from "react-icons/rx";
import api from "@/api";
import { GrFormFilter } from "react-icons/gr";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type Props = {
  selectedData: any;
  setSelectedData: any;
  // updateQuery: any;
};

const Sidefilter = ({ selectedData, setSelectedData }: Props) => {
  const router = useRouter();

  const [openfilterModal, setopenfilterModal] = useState<any>(false);
  const [category, setCategory] = useState<any>();
  const [largeScreen, setLargeScreen] = useState<any>();
  const [allsliderValue, setallSlidervalue] = useState<any>([0, 50]);
  const [productTypes, setProductTypes] = useState<any>();
  const [allFilterValue, setAllFilterValue] = useState<any>();
  const [colors, setColors] = useState<any>();

  const [sideFilterData, setSideFilterData] = useState<any>([]);

  useEffect(() => {
    getFilterData();
  }, []);

  const getFilterData = () => {
    api({
      method: "GET",
      url: `products/getSpecificationData/${process.env.NEXT_PUBLIC_IDENTIFIER}`,
    })
      .then((res: any) => {
        console.log(res?.data);
        setSideFilterData(res?.data);
      })
      .catch((err) => console.log(err));
  };

  const handlePriceChange = (values: any) => {
    let temp = { ...selectedData };
    temp.priceMin = values[0];
    temp.priceMax = values[1];
    addToQuery({ ...temp });
  };

  const handleselect = (e: any) => {
    console.log(e.target.name, e.target.value);
    var { name, value } = e.target;
    console.log(selectedData);
    let temp = { ...selectedData };

    if (e.target.checked) {
      temp[name] = [...temp[name], value];
    }
    // remove the element from selectedData when unchecked
    else {
      let dum = temp[name];
      console.log(dum);

      dum.splice(temp[name].indexOf(value), 1);
      temp[name] = dum;
    }

    addToQuery({ ...temp });
  };

  //This code inside useEffect helps to push all selected values in query.so, that it will be fetched by other components like product and collection to send to filter api.

  // useEffect(() => {
  //   console.log(selectedData);
  //   addToQuery();
  //   dispatch(addFilter({ ...selectedData }));
  // }, [selectedData
  // ]);

  const addToQuery = (val: any) => {
    const query = {
      productSubGroup3: val.productSubGroup3?.join(","),
      productSubGroup1: val.productSubGroup1?.join(","),
      productCollection: val?.productCollection?.join(","),
      productSolution: val.productSolution?.join(","),
      colors: val.colors?.join(","),
    };

    const temp_query = {};
    Object.keys(query).map((val) => {
      //@ts-ignore
      if (query[val] !== "") {
        //@ts-ignore
        temp_query[val] = query[val];
      }
      return val;
    });
    // let variable=router.asPath;
    router.push({
      pathname: router.pathname,
      query: router.query.id
        ? { id: router.query.id, ...temp_query }
        : { ...temp_query },
    });
  };

  // This below function push all values stored in selectedData in a array to display in active filter section.

  // console.log(allValues);
  // useEffect(() => {
  //   let allValues: any = [];
  //   Object.keys(selectedData).map((val) => {
  //     // allValues = allValues.filter((val: any) => val != undefined);
  //     if (val == "productCollection") {
  //       if (selectedData[val]?.length >= 0) {
  //         const newarr = selectedData[val];
  //         newarr.map((val: any) => {
  //           allValues.push(titleCase(MapCollectionToName(val)));
  //         });
  //         setAllFilterValue((prevdata: any) => allValues);
  //       }
  //       // console.log(val);
  //       // const array:any=
  //     } else if (
  //       val == "productSubGroup1" ||
  //       val == "productSubGroup3" ||
  //       val == "productSolution" ||
  //       val == "colors"
  //     ) {
  //       if (selectedData[val]?.length >= 0) {
  //         const array = selectedData[val];
  //         allValues.push(...array);
  //         // console.log(allFilterValue);
  //         //  allValues = allValues.filter((val: any) => val != undefined);
  //         setAllFilterValue(allValues);

  //         // setAllFilterValue([...allFilterValue.filter((val:any)=>val!=undefined)])
  //       }
  //     }
  //   });
  // }, [selectedData]);

  // console.log(allValues);
  // console.log(allFilterValue);
  // console.log(selectedData);

  //It clears the filter
  // console.log(selectedData);
  // console.log(allFilterValue);

  // const handleClearAll = () => {
  //   let temp = { ...selectedData };

  //   // setSelectedData({
  //   (temp.productSubGroup3 = []),
  //     (temp.productSubGroup1 = []),
  //     (temp.productCollection = []),
  //     (temp.productSolution = []),
  //     (temp.colors = []),
  //     (temp.lengthMin = ""),
  //     (temp.lengthMax = ""),
  //     (temp.widthMin = ""),
  //     (temp.widthMax = ""),
  //     (temp.heightMin = ""),
  //     (temp.heightMax = ""),
  //     (temp.priceMin = ""),
  //     (temp.priceMax = ""),
  //     // });

  //     setSelectedData({
  //       productSubGroup3: [],
  //       productSubGroup1: [],
  //       productCollection: [],
  //       productSolution: [],
  //       colors: [],
  //       lengthMin: "",
  //       lengthMax: "",
  //       widthMin: "",
  //       widthMax: "",
  //       heightMin: "",
  //       heightMax: "",
  //       priceMin: "",
  //       priceMax: "",
  //     });
  //   addToQuery({ ...temp });
  // };
  // const [sliderValues, setSliderValues] = useState([0, 20]);

  // These are menu from antd
  console.log(sideFilterData);
  const items: any = [
    sideFilterData?.map((data: any, ind: any) => {
      return getItem(
        "category",
        `sub1`,
        null,

        allsliderValue?.map((item: any, index: any) => {
          return getItem(
            item,
            String(index + 1),
            <Checkbox
              name="productSubGroup1"
              value={item}
              // onChange={handleselect}
              // checked={
              //   selectedData?.productSubGroup1?.includes(item) ? true : false
              // }
            />
          );
        })
      );
    }),
  ];

  const [activeFilter, setactiveFilter] = useState<any>(0);

  useEffect(() => {
    window.innerWidth > 1000 ? setLargeScreen(true) : setLargeScreen(false);
  }, []);

  const [selectedFilter, setSelectedFilter] = useState<any>();

  const FilterItems = [
    "Product Category",
    "Product Sub Category",
    "Collection",
    "Concepts",
    "Colors",
    "Dimension",
    "Price",
  ];
  const FilterData = [
    ["Tableware", "Buffetware"],
    // productSubCategory,
    ["Daydream", "Earth Serve", "Serenity", "Grace", "Gourmet"],
    // productSolutionData,
    // colors,
  ];
  const FilterName = [
    "productSubGroup1",
    "productSubGroup3",
    "productCollection",
    "productSolution",
    "colors",
  ];

  // const renderFilterContent = () => {
  //   // console.log(activeFilter);
  //   // console.log(FilterData[activeFilter]);

  //   if (activeFilter < 5) {
  //     return (
  //       <div className={styles.new_filter}>
  //         {FilterData[activeFilter].map((val: any, index: any) => {
  //           return (
  //             <span key={index}>
  //               <input
  //                 type="checkbox"
  //                 name={FilterName[activeFilter]}
  //                 value={val}
  //                 onChange={handleselect}
  //                 checked={
  //                   selectedData[FilterName[activeFilter]]?.includes(val)
  //                     ? true
  //                     : false
  //                 }
  //               />
  //               <p>{val}</p>
  //             </span>
  //           );
  //         })}
  //       </div>
  //     );
  //   }
  //   if (activeFilter == 5) {
  //     return (
  //       <>
  //         <div>
  //           <label
  //             id="slider-label"
  //             style={{ height: "2vh", paddingBottom: "5px" }}
  //           >
  //             Length
  //           </label>
  //           <ReactSlider
  //             className="horizontal-slider"
  //             thumbClassName="example-thumb"
  //             onAfterChange={handleLengthChange}
  //             trackClassName="example-track"
  //             value={[
  //               selectedData.lengthMin || 0,
  //               selectedData.lengthMax || 50,
  //             ]}
  //             ariaLabelledby={["first-slider-label", "second-slider-label"]}
  //             ariaValuetext={(state: any) => `Thumb value ${state.valueNow}`}
  //             renderThumb={(props: any, state: any) => (
  //               <div {...props}>{state.valueNow}</div>
  //             )}
  //             min={0}
  //             max={50}
  //             pearling
  //             minDistance={2}
  //           />
  //         </div>
  //         <div>
  //           <label
  //             id="slider-label"
  //             style={{ height: "2vh", paddingBottom: "5px" }}
  //           >
  //             Width
  //           </label>
  //           <ReactSlider
  //             className="horizontal-slider"
  //             thumbClassName="example-thumb"
  //             trackClassName="example-track"
  //             onAfterChange={handleWidthChange}
  //             value={[selectedData.widthMin || 0, selectedData.widthMax || 50]}
  //             ariaLabelledby={["first-slider-label", "second-slider-label"]}
  //             ariaValuetext={(state: any) => `Thumb value ${state.valueNow}`}
  //             renderThumb={(props: any, state: any) => (
  //               <div {...props}>{state.valueNow}</div>
  //             )}
  //             min={0}
  //             max={50}
  //             pearling
  //             minDistance={2}
  //           />
  //         </div>
  //         <div>
  //           <label
  //             id="slider-label"
  //             style={{ height: "2vh", paddingBottom: "5px" }}
  //           >
  //             Height
  //           </label>
  //           <ReactSlider
  //             className="horizontal-slider"
  //             thumbClassName="example-thumb"
  //             trackClassName="example-track"
  //             onAfterChange={handleHeightChange}
  //             value={[
  //               selectedData.heightMin || 0,
  //               selectedData.heightMax || 50,
  //             ]}
  //             ariaLabelledby={["first-slider-label", "second-slider-label"]}
  //             ariaValuetext={(state: any) => `Thumb value ${state.valueNow}`}
  //             renderThumb={(props: any, state: any) => (
  //               <div {...props}>{state.valueNow}</div>
  //             )}
  //             min={0}
  //             max={50}
  //             pearling
  //             minDistance={2}
  //           />
  //         </div>
  //       </>
  //     );
  //   }
  //   if (activeFilter == 6) {
  //     return (
  //       <div>
  //         <label
  //           id="slider-label"
  //           style={{ height: "2vh", paddingBottom: "5px" }}
  //         >
  //           Price
  //         </label>
  //         <ReactSlider
  //           className="horizontal-slider"
  //           thumbClassName="example-thumb"
  //           trackClassName="example-track"
  //           onAfterChange={handlePriceChange}
  //           value={[selectedData.priceMin || 0, selectedData.priceMax || 3000]}
  //           ariaLabelledby={["first-slider-label", "second-slider-label"]}
  //           ariaValuetext={(state: any) => `Thumb value ${state.valueNow}`}
  //           renderThumb={(props: any, state: any) => (
  //             <div {...props}>{state.valueNow}</div>
  //           )}
  //           pearling
  //           minDistance={10}
  //           min={0}
  //           max={3000}
  //         />
  //       </div>
  //     );
  //   }
  // };

  return (
    <>
      {/* {console.log(allFilterValue)} */}
      {largeScreen ? (
        <>
          <div className={styles.active_filter}>
            {allFilterValue?.length > 0 && allFilterValue[0] != undefined && (
              <div className={styles.filterAndClear}>
                <h5>active filter</h5>
                <h5>Clear All</h5>
              </div>
            )}
            {allFilterValue?.length > 0 && (
              <div className={styles.filters}>
                {allFilterValue
                  .filter((val: any) => val != undefined)
                  .map((item: any, index: any) => {
                    return (
                      <button key={index} value={item}>
                        <p>{item}</p>
                        {/* <RxCross2 onClick={() => handledelete(item)} />{" "} */}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
          <div
            className={styles.dropdown_filter_main}
            style={{ marginTop: "20px" }}
          >
            <Menu
              // onClick={onClick}
              className={styles.menu}
              // style={{  width: 310 }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          </div>
        </>
      ) : (
        <>
          {openfilterModal ? (
            <div className={styles.filter_button}>
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "25vw",
                  alignItems: "center",
                }}
              >
                {" "}
                <p onClick={() => setopenfilterModal((prev: any) => !prev)}>
                  CLOSE
                </p>{" "}
                <p onClick={() => setopenfilterModal((prev: any) => !prev)}>
                  APPLY
                </p>{" "}
              </span>
            </div>
          ) : (
            <div
              className={styles.filter_button}
              onClick={() => setopenfilterModal((prev: any) => !prev)}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <GrFormFilter /> <p>FILTER</p>{" "}
              </span>
            </div>
          )}

          {openfilterModal && (
            <div className={styles.filter_modal_main}>
              <div className={styles.filter_modal_top}>
                <p>Filters</p>
                {/* <p onClick={() => handleClearAll()}>Clear All</p> */}
              </div>
              <div className={styles.main_filter_container}>
                <div className={styles.filter_items}>
                  {FilterItems.map((val: any, index: any) => {
                    return (
                      <>
                        <h5 key={index} onClick={() => setactiveFilter(index)}>
                          {val}
                        </h5>
                      </>
                    );
                  })}
                </div>
                <div className={styles.selected_filter}>
                  {/* {renderFilterContent()} */}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Sidefilter;
