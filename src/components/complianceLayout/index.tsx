"use client";
import React from "react";
import styles from "./complianceLayout.module.css";
import { usePathname, useRouter } from "next/navigation";

const ComplianceLayout = (props: any) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <div>
          {pathname.includes("/policies") ? (
            <ul>
              <li
                className={
                  pathname.includes("/policies/cancellation")
                    ? styles.active
                    : ""
                }
                onClick={() => {
                  router.push("/policies/cancellation");
                }}
              >
                <h3>Cancellation Policy</h3>
              </li>
              <li
                className={
                  pathname.includes("/policies/terms") ? styles.active : ""
                }
                onClick={() => {
                  router.push("/policies/terms");
                }}
              >
                <h3>Terms & Conditions</h3>
              </li>
              <li
                className={
                  pathname.includes("/policies/privacy") ? styles.active : ""
                }
                onClick={() => {
                  router.push("/policies/privacy");
                }}
              >
                <h3>Privacy Policy</h3>
              </li>
            </ul>
          ) : (
            <ul>
              <li
                onClick={() => {
                  router.push("/contact-us");
                }}
                className={
                  pathname.includes("/contact-us") ? styles.active : ""
                }
              >
                <h3>CONTACT US</h3>
              </li>
              <li
                onClick={() => {
                  router.push("/store-locator");
                }}
                className={
                  pathname.includes("/store-locator") ? styles.active : ""
                }
              >
                <h3>STORE LOCATOR</h3>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className={styles.right_container}>{props.children}</div>
    </div>
  );
};

export default ComplianceLayout;
