import Wishlist from "@/assets/Icons/nav/heart.svg";
import Cart from "@/assets/Icons/nav/bag.svg";
import Search from "@/assets/Icons/nav/search.svg";
import Account from "@/assets/Icons/nav/user.svg";
import Locate from "../assets/Icons/nav/location.svg";
import Contact from "@/assets/Icons/nav/reserve.svg";
import api from "@/api";

export const home_nav = [
  { name: "jewellery", path: "" },
  { name: "solitaires", path: "/solitaires" },
  { name: "collection", path: "/collection" },
  { name: "deals", path: "/deals" },
  { name: "education", path: "/education/choose-your-perfect-diamond" },
  { name: "know your brand", path: "" },
];

export const nav_icon_1 = [
  {
    title: "Locate Store",
    icon: Locate,
    path: "/contact-us",
    action: "",
    external: true,
    white: "white",
  },
  // { title: "Contact Us", icon: Contact, path: "", action: "", white: "white" },
];

export const nav_icon_2 = [
  { title: "search", icon: Search, path: "", white: "white" },
  { title: "cart", icon: Cart, path: "", white: "white" },
  { title: "account", icon: Account, path: "", white: "white" },
];

export const nav_2 = [
  { title: "chocolate cake", path: "/products?category=chocolate-cakes" },
  { title: "elementary cakes", path: "/products?category=elementary-cakes" },
  { title: "cheesecakes", path: "/products?category=cheesecakes" },
  { title: "Shop", path: "/products?category=savouries" },
];
