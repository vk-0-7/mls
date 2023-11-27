"use client";
import React, { useEffect, useState } from "react";
import styles from "./Retaino.module.css";
import { useKeyContext } from "./context/keyContext";

type Props = {
  type: "checkout" | "login" | "update_user";
  url?: string;
  open: boolean;
  onClose: () => void;
  onLogin?: any;
};

const Retaino = (props: Props) => {
  const { key } = useKeyContext();

  useEffect(() => {
    let iframe = document.getElementById("retaino-iframe") as HTMLIFrameElement;
    let iframeLoading = document.getElementById(
      "retaino-loading-screen"
    ) as HTMLDivElement;

    if (props.open) {
      iframe.addEventListener("load", () => {
        setTimeout(() => {
          // hide the loading indicator
          iframeLoading.style.display = "none";
          // bring the iframe back
          iframe.style.opacity = "1";
        }, 1000);
      });
    }

    window.addEventListener("message", (e) => {
      if (e.data === "retaino_close_iframe_window") {
        props.onClose();
      }

      if (e.data === "retaino_iframe_login_window_ready") {
        const iframe = document.getElementById(
          "retaino-iframe"
        ) as HTMLIFrameElement;
        // @ts-ignore
        iframe.contentWindow?.postMessage(`website_token:${key}`, "*");
      }
      if (typeof e.data === "string") {
        if (e.data.includes("session_token")) {
          props.onLogin(e.data.split("").splice(14, e.data.length).join(""));
        }
      }
    });
  }, [props.open]);

  const listenClick = (e: any) => {
    console.log("clicked : ", e.data);
  };

  return props.open ? (
    <div
      style={{
        position: "fixed",
        top: "0",
        height: "100vh",
        width: "100vw",
        zIndex: "10000000000",
      }}
    >
      {/* loading screen */}
      <div
        id="retaino-loading-screen"
        className={styles.retaino_loading_screen}
      >
        <div className={styles.loading_card}>
          <LoadingScreen />
        </div>
      </div>

      {/* the iframe */}
      <iframe
        id={"retaino-iframe"}
        src={
          props.type === "checkout"
            ? props.url
            : props.type === "update_user"
            ? "https://checkout.retaino.in/update/user/" +
              localStorage.getItem("user_id") +
              "/" +
              localStorage.getItem("session_token")
            : "https://checkout.retaino.in/login"
        }
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          opacity: "0",
          zIndex: "1000000000000000",
        }}
        onClick={listenClick}
      ></iframe>
    </div>
  ) : (
    <></>
  );
};

const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_head}>
        <div className={`${styles.logo} ${styles.loading}`}></div>
      </div>
      <div className={`${styles.container_border} ${styles.loading}`}></div>
      <div className={styles.container_content}>
        <ul>
          <li className={styles.loading}></li>
          <li className={styles.loading}></li>
          <li className={styles.loading}></li>
          <li className={styles.loading}></li>
        </ul>
      </div>
    </div>
  );
};

export default Retaino;
