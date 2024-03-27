import ResetPassPage from "@/pages/ResetPassPage";
import { siteMetadata } from "@/helper/siteMetaData";

export async function generateMetadata({ params }) {

  const title = 'Reset Password'
  const description = 'Reset Password Description'

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
    <ResetPassPage />
  );
}
