"use client";

import { social_media_links } from "@/data/footer";
import { BOTTOM_STRIP_TEXT, FOOTER_EMAIL, TAG_LINE } from "@/data/var";
import styles from "./footer.module.css";
import Link from "next/link";
import { useAppContext } from "@/context/context";

const Footer = () => {
  const { categories }: any = useAppContext();

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <ul className={styles.footer_content}>
          <li>
            {/* <Logo className={styles.logo} /> */}
            <div className={styles.below_logo}>
              <p>{TAG_LINE}</p>
              <a href={`mailto:${FOOTER_EMAIL}`}>{FOOTER_EMAIL}</a>
              <div className={styles.social_container}>
                {social_media_links.map((val, index) => {
                  return (
                    <Link key={index} href={val.link}>
                      <val.icon />
                    </Link>
                  );
                })}
              </div>
            </div>
          </li>
          <li>
            <h5>Our Offerings</h5>
            {/* <ul className={styles.list_center}>
              {categories?.map((nav: string, index: any) => {
                return (
                  <li key={index}>
                    <Link href={`products?category=${nav}`}>{nav}</Link>
                  </li>
                );
              })}
            </ul> */}
          </li>
          <li>
            <h5>About Us</h5>
            <ul className={styles.list_center}>
              <li>Know the brand</li>
              <li>
                <Link href={"/contact-us"}>Contact Us</Link>
              </li>
            </ul>
          </li>
          <li>
            <h5>POLICIES</h5>
            <ul className={styles.list_center}>
              <li>
                <Link href={"/policies/cancellation"}>Cancellation policy</Link>
              </li>
              <li>
                <Link href={"/policies/terms"}>Terms & conditions</Link>
              </li>
              <li>
                <Link href={"/policies/privacy"}>Privacy policy</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={styles.bottom_strip}>
        <div>
          Copyright © Petite Patisserie 2021 All rights reserved | Developed in
          India by{" "}
          <a href="https://bit.ly/3LO2nnx" target="_blank">
            CFT Lab
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Footer;
