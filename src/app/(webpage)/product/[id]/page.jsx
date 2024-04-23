import { siteMetadata } from "@/helper/siteMetaData";
import ProductPage from "@/pages/ProductPage";


export async function generateMetadata({ params }) {

  const title = 'Product'
  const description = 'Product Description'

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
  return (
    <ProductPage categories={params.id} subCategories={params.subcate}/>
  )
}