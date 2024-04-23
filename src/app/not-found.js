"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { siteMetadata } from "@/helper/siteMetaData";

export async function generateMetadata({ params }) {

  const title = '404 This page could not be found.'
  const description = '404 This page could not be found.'

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

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="w-screen h-screen">
      <title>404 This page could not be found.</title>
      <div className="flex flex-col h-full justify-center items-center p-4">
        <div>
          <Image src={'/Error404.svg'} alt='' width={500} height={500} className="lg:w-[500px] md:w-[400px] w-[300px]" />
        </div>
        <div className="flex flex-col sm:gap-6 gap-3 items-center">
          <div className="lg:text-4xl md:text-3xl text-2xl font-semibold">404, Page not founds</div>
          <div className="font-normal text-[#475156] max-w-[520px] text-center md:text-base text-sm">Something went wrong. It’s look that your requested could not be found. It’s look like the link is broken or the page is removed.</div>
          <div className="flex gap-3">
            <Button size='lg' onClick={() => router.back()}>
              <div className="flex gap-2 items-center justify-center">
                <ArrowLeft className="md:w-4 md:h-4 w-3 h-3" />
                <div>go back</div>
              </div>
            </Button>
            <Button size='lg' variant='outline' onClick={() => router.push('/')}>
              <div className="flex gap-2 items-center justify-center">
                <div>go to home</div>
                <Home className="md:w-4 md:h-4 w-3 h-3" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}