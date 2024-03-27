import { siteMetadata } from "@/helper/siteMetaData";
import MyProfilePage from "@/pages/MyProfilePage";

export async function generateMetadata({ params }) {

  const title = 'My Profile'
  const description = 'My Profile Description'

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
    <MyProfilePage />
  )
}