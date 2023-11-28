"use client";
import { nav_icon_1, nav_icon_2, nav_2 } from "@/data/nav";
import styles from "./navbar.module.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppContext } from "@/context/context";
import Search from "../search";
import { useEffect, useState } from "react";
import EmptyCart from "../emptyCart";
import Retaino from "../third-party/Retaino";
import { useCartContext } from "@/context/cartContext";
import MobileMenu from "../mobileMenu";
import api from "@/api";
import { capatalize } from "@/utils/utils";

const Navbar = () => {
  const { categories }: any = useAppContext();
  console.log(categories);
  const path = usePathname();
  console.log(path);
  const router = useRouter();
  const [searchModal, setSearchModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const { cart, localToCloud }: any = useCartContext();
  console.log(cart);
  const handleIconClick = (icon: any) => {
    if (icon.title === "search") {
      setSearchModal(true);
    }

    if (icon.title === "cart" && cart?.length === 0) {
      setCartModal(true);
    } else if (icon.title === "cart" && cart?.length > 0) {
      router.push("/cart");
    }
  };

  const handleLogin = (session: string) => {
    const sessionObj = JSON.parse(session);
    localStorage.setItem("session_token", sessionObj.session);
    localStorage.setItem("user_id", sessionObj.userId);
    localToCloud();
  };

  useEffect(() => {
    const FetchNav = async () => {
      api({
        url: `products/categoryList/${process.env.NEXT_PUBLIC_IDENTIFIER}`,
        method: "GET",
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log("error fetching data", error);
        });
    };
    FetchNav();
  }, []);

  return (
    <>
      <Retaino
        type="login"
        open={modal}
        onClose={() => setModal(false)}
        onLogin={handleLogin}
      />
      <div className={path === "/" ? styles.container : styles.container_two}>
        {/* first row of nav */}
        <div className={styles.nav_first_row}>
          <p>Discount</p>
        </div>

        <div className={styles.nav_second_row}>
          <div className={styles.logo_container}>
            <Link href="/">
              <img src="/images/logo.webp" className={styles.logo} />
            </Link>
          </div>
          <div className={styles.navmenu}>
            <ul>
              {categories?.map((nav: any, index: any) => {
                return (
                  <li
                    key={index}
                    onClick={() => router.push("/products?category=" + nav)}
                  >
                    {capatalize(nav)}
                  </li>
                );
              })}
            </ul>
          </div>
          <ul className={styles.icons}>
            {!menu &&
              nav_icon_2.map((icon: any, index: any) => {
                return (
                  <li
                    key={index}
                    id={icon.title === "account" ? "account_icon" : ""}
                    onClick={() => {
                      if (icon.title === "account") {
                        if (localStorage.getItem("session_token")) {
                          router.push("/account");
                        } else {
                          setModal(true);
                        }
                      }
                      handleIconClick(icon);
                    }}
                  >
                    {icon.title === "cart" && cart?.length > 0 ? (
                      <>
                        <div className={styles.bubble}>{cart.length}</div>
                      </>
                    ) : (
                      <></>
                    )}
                    <icon.icon
                      className={`${styles["nav_icon_" + icon.white]}`}
                    />
                  </li>
                );
              })}
            {!searchModal && (
              <li
                className={`${styles.menu_icon} ${menu && styles.active_menu}`}
                onClick={() => setMenu((prev) => !prev)}
              >
                <div style={path !== "/" ? { background: "black" } : {}}></div>
                <div style={path !== "/" ? { background: "black" } : {}}></div>
                <div style={path !== "/" ? { background: "black" } : {}}></div>
              </li>
            )}
          </ul>
        </div>
      </div>
      <EmptyCart open={cartModal} onClose={() => setCartModal(false)} />
      <Search open={searchModal} onClose={() => setSearchModal(false)} />
      {/* <MobileMenu open={menu} onClose={() => setMenu(false)} /> */}
    </>
  );
};

export default Navbar;
