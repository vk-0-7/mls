import React, { useEffect } from "react";
import styles from "./search.module.css";
import api from "@/api";
import { useRouter } from "next/navigation";
import Close from "@/assets/Icons/cross.svg";
import SearchIcon from "@/assets/Icons/nav/search.svg";
import { hero_data } from "@/data/data";

type Props = {
  open: boolean;
  onClose: () => void;
};

const Search = (props: Props) => {
  const [search, setSearch] = React.useState("");
  const [results, setResults]: any = React.useState([]);
  const router = useRouter();

  useEffect(() => {
    const search_input = document.getElementById("search_input_box");
    console.log("something goes her ", search_input);
    search_input?.focus();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getData();
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const getData = () => {
    if (search !== "") {
      api({
        url: `products/search/${process.env.NEXT_PUBLIC_IDENTIFIER}?text=${search}`,
        method: "GET",
      })
        .then((res: any) => {
          setResults([...res.data.data]);
        })
        .catch((err) => {
          console.log("error is : :: : ", err);
        });
    } else {
      return setResults([]);
    }
  };

  return (
    <>
      {props.open ? (
        <div className={styles.container} onClick={props.onClose}>
          <div
            className={styles.main}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Close className={styles.close} onClick={props.onClose} />

            <div className={styles.header}>
              <div className={styles.search_input}>
                <SearchIcon className={styles.search_icon} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  id="search_input_box"
                />

                {search !== "" && (
                  <Close
                    className={styles.clear_icon}
                    onClick={() => setSearch("")}
                  />
                )}

                <Close
                  className={styles.mob_close_icon}
                  onClick={props.onClose}
                />
              </div>
            </div>
            <div className={styles.results}>
              {search === "" ? (
                <div className={styles.default_results}>
                  <div>
                    <h3>/Categories </h3>
                    <div className={styles.default_categories}>
                      <div
                        className={styles.default_category}
                        onClick={() => {
                          props.onClose();
                          router.push("/products?category=chocolate+cakes");
                        }}
                      >
                        <img
                          src="https://source.unsplash.com/random/500x500/?cake"
                          alt=""
                        />
                        <p>chocolate cakes</p>
                      </div>

                      <div
                        className={styles.default_category}
                        onClick={() => {
                          props.onClose();
                          router.push("/products?category=assortment");
                        }}
                      >
                        <img
                          src="https://source.unsplash.com/random/500x500/?cake"
                          alt=""
                        />
                        <p>assortment</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ul>
                  {results.map((item: any, index: any) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          props.onClose();
                          router.push(`/${item.seListing.routeHandle}`);
                        }}
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE}${item.mediaUrl[0]}`}
                          alt=""
                        />
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.category}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
