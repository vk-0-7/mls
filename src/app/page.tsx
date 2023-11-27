"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import api from "@/api";
import Carousel from "../components/carousel/carousel";
import { heroCarousel } from "@/data/data";
const Home = () => {
  const [rings, setRings] = useState<Array<Object>>([]);
  const [necklace, setNecklace] = useState<Array<Object>>([]);

  useEffect(() => {
    getRings();
    getNecklace();
  }, []);

  const getRings = () => {
    api({
      url: `products/filter?identifier=mlsjewels.com&category=ring`,
      method: "GET",
    })
      .then((res) => {
        setRings([...res.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getNecklace = () => {
    api({
      url: `products/filter?identifier=mlsjewels.com&category=necklace`,
      method: "GET",
    })
      .then((res) => {
        setNecklace([...res.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(necklace);
  return (
    <>
      <div>
        <div className={styles.hero_carousel}>
          <Carousel data={heroCarousel} itemtoshow={1} type={"events"} />
        </div>

        <div className={styles.normal_card_carousel}>
          <h1>MLS Selection</h1>
          <Carousel data={heroCarousel} itemtoshow="4" type={"normal_card"} />
        </div>
        <div className={styles.best_sellers}>
          <h1>Best Seller</h1>
          <Carousel data={heroCarousel} itemtoshow="4" type={"normal_card"} />
        </div>
        <div className={styles.rings_carousel}>
          <h1>Rings</h1>
          <Carousel data={rings} itemtoshow="4" type={"product_card"} />
        </div>
        <div className={styles.necklace_carousel}>
          <h1>Necklace</h1>
          <Carousel data={necklace} itemtoshow="4" type={"product_card"} />
        </div>
      </div>
    </>
  );
};

export default Home;
