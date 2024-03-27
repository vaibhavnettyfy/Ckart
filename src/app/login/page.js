import LoginPage from "@/pages/LoginPage";
import { siteMetadata } from "@/helper/siteMetaData";

export async function generateMetadata({ params }) {

  const title = 'Login'
  const description = 'Login Description'

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
    <LoginPage />
  );
}
