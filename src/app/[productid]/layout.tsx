import axios from "axios";
import ProductDetail from "./page";
import { capatalize } from "@/utils/utils";

// import Head from "next/head";
// import Script from "next/script";
// import { KyeContextProvider } from "@/components/third-party/context/keyContext";
// import { CartContextProvider } from "@/context/cartContext";
// import { ContextProvider } from "@/context/context";
// import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Sidefilter from "../../components/sidefilter/sidefilter";

export async function generateMetadata({ params }: any) {
  console.log(params);

  try {
    const res = await axios({
      url: `https://backend.cftcommerce.com/api/products/${process.env.NEXT_PUBLIC_IDENTIFIER}/${params.productid}`,
      method: "GET",
    });

    const data = res.data.product[0];

    console.log(data);

    return {
      title: capatalize(data.title) + " | Petite Patisserie",
    };
  } catch (err: any) {
    return { title: "Petite Patisserie" };
  }
}

const ProductDetailWrapper = async (props: any) => {
  console.log(props);

  let res: any = await fetch(
    `https://backend.cftcommerce.com/api/products/${props?.params.productid}`
  );

  res = await res.json();
  console.log(res);
  //   console.log(res?.product[0]);

  //   const data = res?.product[0];

  //   const obj = {
  //     "@context": "https://schema.org/",
  //     "@type": "Product",
  //     name: data?.title,
  //     image:
  //       "https://business-1-images.s3.ap-south-1.amazonaws.com/petitepatisseriein/" +
  //       data?.mediaUrl[0],
  //     description: data?.description
  //       .replaceAll("<(.|\n)*?>", "")
  //       .replaceAll("&nbsp;", " ")
  //       .replaceAll("&amp;", "&"),
  //     brand: {
  //       "@type": "Thing",
  //       name: "Petite",
  //     },
  //   };

  return (
    <>
      {/* <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(obj),
          }}
          key={`item-jsonld-${data?._id}`}
          // id={`item-jsonld-${data?._id}`}
        ></script>
      </head> */}
      <>
        <ProductDetail data={res?.product} id={props.params.id} />
      </>
    </>
  );
};

export default ProductDetailWrapper;
