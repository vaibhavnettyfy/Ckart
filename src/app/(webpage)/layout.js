import { Urbanist } from "next/font/google";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { siteMetadata } from "@/helper/siteMetaData";
import { Providers } from "../globalRedux/Providers";


// export const metadata = {
//   metadataBase: new URL(siteMetadata.siteUrl),
//   title: {
//     template: `%s | ${siteMetadata.title}`,
//     default: siteMetadata.title,
//   },
//   description: siteMetadata.description,
//   openGraph: {
//     title: siteMetadata.title,
//     description: siteMetadata.description,
//     url: siteMetadata.siteUrl,
//     siteName: siteMetadata.title,
//     images: [siteMetadata.socialBanner],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: siteMetadata.title,
//     images: [siteMetadata.socialBanner],
//   },
// };


export default function Layout({ children }) {

  return (
    <div>
      <Providers>
      <Header />
      {children}
      <Footer />
      </Providers>
    </div>

  );
}
