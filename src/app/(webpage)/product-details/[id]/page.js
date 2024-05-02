import { siteMetadata } from "@/helper/siteMetaData";
import ProductDetailsPage from "@/pages/ProductDetailsPage";

export async function generateMetadata({ params }) {
  const title = "Product Details";
  const description = "Product Details Description";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://ckart.vercel.app/product-details/${params.id}`,
      siteName: "Ckart",
      locale: "en_US",
      images: "/about.png",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: "/about.png",
    },
  };
}
export default function Page({ params }) {
  const callBackHandler = (data) => {
    console.log("data", data);
  };
  return (
    <ProductDetailsPage productKey={params.id} callBackData={callBackHandler} />
  );
}
