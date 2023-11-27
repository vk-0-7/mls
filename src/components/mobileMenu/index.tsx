import React, { useEffect } from "react";
import styles from "./mobileMenu.module.css";
import { useAppContext } from "@/context/context";
import Link from "next/link";
import { social_media_links } from "@/data/footer";

const MobileMenu = (props: any) => {
  const { categories }: any = useAppContext();

  useEffect(() => {
    // if open is true stop scrolling
    if (props.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [props.open]);

  return (
    <div
      className={`${styles.container} ${props.open && styles.container_active}`}
    >
      <ul>
        {categories.map((val: any, index: any) => {
          return (
            <li key={index}>
              <Link href={"/products?category=" + val} onClick={props.onClose}>
                {val}
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className={styles.social_icons}>
        {social_media_links.map((val, index) => {
          return (
            <li key={index}>
              <Link key={index} href={val.link}>
                <val.icon />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileMenu;
