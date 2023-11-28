import { useEffect } from "react";
import "@splidejs/react-splide/css";

import Image from "next/image";
import styles from "./carousel.module.css";
import Link from "next/link";
import Cards from "../cards/cards";
import Button from "../Buttons/buttons";
import { useRouter } from "next/router";

// import { MapCollectionToName, titleCase } from "@/utils";
import { Splide, SplideSlide } from "@splidejs/react-splide";

type props = {
  data: any;
  itemtoshow: any;
  type?: any;
  setMainImage?: any;
};

const Herocarousel = ({ data, itemtoshow, type, setMainImage }: props) => {
  // const router = useRouter();
  // console.log(data,itemtoshow);

  // console.log('sorted data is',sortedData);

  return (
    <div
      className="splide_container"
      style={itemtoshow === 1 ? { width: "100%" } : {}}
    >
      <Splide
        aria-label="My Favorite Images"
        className={styles.splide_main}
        options={{
          type: "loop",
          perPage: itemtoshow,
          pagination: false,
          perMove: 1,
          arrows: false,
          autoplay: true,
          interval: 2000,
          pauseOnHover: true,
          drag: true,
          breakpoints: {
            900: {
              perPage: 2,
            },
            700: {
              perPage: 1,
            },
            500: {
              perPage: itemtoshow == 3.5 || itemtoshow == 4 ? 2 : 1,
            },
          },
        }}
      >
        {itemtoshow == "1" &&
          (type == "events" ? (
            <>
              {console.log(data)}
              {data?.map((val: any, index: any) => {
                return (
                  <SplideSlide className={styles.event_carousel} key={index}>
                    <div className={styles.event_carousel_image}>
                      <div className={styles.overlay_text}>
                        <h1>{val.title}</h1>
                      </div>
                      <Image src={val.img} alt="..." width={500} height={500} />
                    </div>
                  </SplideSlide>
                );
              })}
            </>
          ) : type == "sm_changing_plate" ? (
            <>
              {data.map((val: any, index: any) => {
                return (
                  <SplideSlide
                    className={styles.home_hero_carousel_sm}
                    key={index}
                  >
                    <div className={styles.home_hero_carousel_sm_image}>
                      <Image src={val} alt="..." />
                    </div>
                  </SplideSlide>
                );
              })}
            </>
          ) : (
            <>
              {console.log(data)}
              <SplideSlide className={styles.carousel_body} id="section">
                <div className={styles.carousel_inner}>
                  <div className={styles.image_section}>
                    <Image src={data[0]?.img} alt="..." />
                  </div>
                  <div className={styles.content}>
                    <span>
                      <h3>{data[0]?.type}</h3>
                      <p>{data[0]?.body}</p>
                    </span>
                  </div>
                </div>
              </SplideSlide>
              {data
                ?.filter((val: any, ind: any) => ind != 0)
                ?.map((item: any, index: any) => {
                  return (
                    <SplideSlide
                      className={styles.carousel_body}
                      key={index}
                      id="section"
                    >
                      <div className={styles.carousel_inner}>
                        <div className={styles.image_section}>
                          <Image src={item.img} alt="..." />
                        </div>
                        <div className={styles.content}>
                          <span>
                            <h3>{item.type}</h3>
                            <p>{item.body}</p>
                          </span>
                        </div>
                      </div>
                    </SplideSlide>
                  );
                })}
            </>
          ))}

        {itemtoshow == "4" &&
          data?.map((item: any, index: any) => {
            return (
              <SplideSlide
                id="nopagination"
                className={styles.fromthecollection_body}
                key={index}
              >
                <Cards data={item} type={type} />
              </SplideSlide>
            );
          })}
        {itemtoshow == "3.5" &&
          data?.map((item: any, index: any) => {
            return (
              <SplideSlide className={styles.sm_carousel} key={index}>
                <div className={styles.sm_card}>
                  <Image
                    src={
                      "https://oreen-images.s3.ap-south-1.amazonaws.com/" +
                      item.image
                    }
                    alt="image not found"
                    height={100}
                    width={100}
                    onClick={() => setMainImage(item.image)}
                  />
                </div>
              </SplideSlide>
            );
          })}
      </Splide>
    </div>
  );
};

export default Herocarousel;
