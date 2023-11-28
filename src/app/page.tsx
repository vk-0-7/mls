"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import api from "@/api";
import Image from "next/image";
import dummy from "../../public/images/brownCake.png";
import Carousel from "../components/carousel/carousel";
import { heroCarousel } from "@/data/data";
import Loader from "@/components/Loader/Loader";
const Home = () => {
  const [rings, setRings] = useState<Array<Object>>([]);
  const [necklace, setNecklace] = useState<Array<Object>>([]);
  const [bestSeller, setBestSeller] = useState<Array<Object>>([]);
  const [featured, setFeatured] = useState<Array<Object>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getBestSeller();
        getFeatured();
        setIsLoading(false);
        getRings();
        getNecklace();
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRings = async () => {
    try {
      const res = await api({
        url: `products/filter?identifier=mlsjewels.com&category=ring`,
        method: "GET",
      });

      setRings([...res.data.data]);
    } catch (error) {
      console.error(error);
    }
  };
  const getNecklace = async () => {
    try {
      const res = await api({
        url: `products/filter?identifier=mlsjewels.com&category=necklace`,
        method: "GET",
      });
      setNecklace([...res.data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getBestSeller = async () => {
    try {
      const res = await api({
        url: `products?identifier=mlsjewels.com&isBestSeller=false`,
        method: "GET",
      });
      console.log(res);
      setBestSeller([...res.data.products]);
    } catch (error) {
      console.error(error);
    }
  };

  const getFeatured = async () => {
    try {
      const res = await api({
        url: `products?identifier=mlsjewels.com&isFeatured=false`,
        method: "GET",
      });
      setFeatured(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(necklace);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className={styles.hero_carousel}>
            <Carousel data={heroCarousel} itemtoshow={1} type={"events"} />
          </div>

          <div className={styles.normal_card_carousel}>
            <h1>MLS Selection</h1>
            <Carousel data={heroCarousel} itemtoshow="4" type={"normal_card"} />
          </div>
          <div className={`${styles.best_sellers} ${styles.product_carousel}`}>
            <h1>Best Seller</h1>
            <Carousel data={bestSeller} itemtoshow="4" type={"product_card"} />
          </div>
          <div className={`${styles.featured} ${styles.product_carousel}`}>
            <h1>Featured</h1>
            <Carousel data={featured} itemtoshow="4" type={"product_card"} />
          </div>
          <div className={styles.static_section}>
            <Image src={dummy} alt="...." />
          </div>

          <div
            className={`${styles.rings_carousel} ${styles.product_carousel}`}
          >
            <h1>Rings</h1>
            <Carousel data={rings} itemtoshow="4" type={"product_card"} />
          </div>
          <div
            className={`${styles.necklace_carousel} ${styles.product_carousel}`}
          >
            <h1>Necklace</h1>
            <Carousel data={necklace} itemtoshow="4" type={"product_card"} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
