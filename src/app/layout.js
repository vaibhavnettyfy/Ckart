import { Urbanist } from "next/font/google";
import "./globals.css";
import { siteMetadata } from "@/helper/siteMetaData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppWrapper, useAppContext } from "@/context";
import ScrollToTop from "@/helper/ScrollToTop";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={urbanist.className}>
        <AppWrapper>
          <ScrollToTop />
          {children}
          <ToastContainer suppressHydrationWarning={true} />
        </AppWrapper>
      </body>
    </html>
  );
}
