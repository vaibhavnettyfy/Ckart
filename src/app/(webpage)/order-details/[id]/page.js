import { siteMetadata } from "@/helper/siteMetaData";
import OrderDetailsPage from "@/pages/OrderDetailsPage";

export async function generateMetadata({ params }) {

  const title = 'Order Details'
  const description = 'Order Details Description'

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: 'https://ckart.vercel.app/about',
      siteName: 'Ckart',
      locale: "en_US",
      images: '/about.png',
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: '/about.png',
    },
  };
}

export default function Page({params}) {
  console.log("params: " + params.id);
  return (
    <OrderDetailsPage orderId={params.id}/>
  )
}