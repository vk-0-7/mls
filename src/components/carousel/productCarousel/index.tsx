"use client";
import styles from "./style.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  data: string[];
};

const ProductImages = (props: Props) => {
  const options = {
    pagination: false,
    isNavigation: true,
    autoWidth: true,
    gap: "10px",
  };

  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);

  useEffect(() => {
    if (primaryRef.current) {
      // @ts-ignore
      primaryRef.current.sync(secondaryRef.current.splide);
    }
  }, [primaryRef, secondaryRef]);

  return (
    <>
      <div className={styles.product_images}>
        <div className={styles.main_img}>
          <Splide
            ref={(slider: any) => (secondaryRef.current = slider)}
            options={{
              perPage: 1,
              pagination: false,
              arrows: false,
              width: "100%",
            }}
          >
            {props.data.map((val: string, index: number) => (
              <SplideSlide key={index + "main"}>
                <div style={{ aspectRatio: "1/1", width: "100%" }}>
                  <Image src={val} alt="product image" fill={true} />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div className={styles.images}>
          <Splide
            ref={(slider: any) => (primaryRef.current = slider)}
            options={options}
            style={{ height: "100%" }}
          >
            {props.data.map((val: string, index: number) => (
              <SplideSlide key={index} style={{ height: "100%" }}>
                <div className={styles.img}>
                  <Image src={val} alt="product image" fill={true} />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </>
  );
};

export default ProductImages;
