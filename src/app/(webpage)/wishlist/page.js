import { siteMetadata } from "@/helper/siteMetaData";
import WishlistPage from "@/pages/WishlistPage";

export async function generateMetadata({ params }) {

  const title = 'Wishlist'
  const description = 'Wishlist Description'

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
    <WishlistPage />
  )
}