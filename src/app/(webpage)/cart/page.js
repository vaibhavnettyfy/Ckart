import { siteMetadata } from "@/helper/siteMetaData";
import CartPage from "@/pages/CartPage";

export async function generateMetadata({ params }) {

  const title = 'Shopping Cart'
  const description = 'Shopping Cart Description'

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

export default function Page() {
  return (
    <CartPage />
  )
}