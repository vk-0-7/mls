"use client";
import React, { useEffect, useState } from "react";
import styles from "./policies.module.css";
import api from "@/api";

const Policies = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [policy, setPolicy] = useState({} as any);

  useEffect(() => {
    getPolicy();
  }, []);

  const getPolicy = () => {
    api({
      method: "get",
      url: `compliances?identifier=${process.env.NEXT_PUBLIC_IDENTIFIER}`,
    })
      .then((res) => {
        let temp = res.data.compliances.find((val: any) => {
          if (val.typeName === props.params.val) {
            return true;
          }
          return false;
        });

        setPolicy(temp === undefined ? null : temp);

        setLoading(false);
      })
      .catch((err) => {});
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>
          <span className="loader"></span>
        </div>
      ) : policy ? (
        <>
          <div className={styles.header}>
            <h1>{policy.title}</h1>
          </div>
          <div className={styles.content}>
            <div
              dangerouslySetInnerHTML={{
                __html: policy?.body.replace(/&nbsp;/g, " "),
              }}
              className={styles.content_body}
            ></div>
          </div>
        </>
      ) : (
        <div className={styles.not_found}>not found</div>
      )}
    </div>
  );
};

export default Policies;
