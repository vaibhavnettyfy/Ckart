"use client";
import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import MultiSelectDropdown from "../common/MultiSelectDropdown";
import { categorySubCategoryList } from "@/Service/Category/Category.service";

const productCollectionList = [
  {
    image: "/productcollection/Build.svg",
    icon: "/productcollection/BuildIcon.svg",
    name: "Building Materials",
    para: "Explore our vast selection at ‘The Creative Store’- your one-stop destination for all construction and building needs. ",
    button: "See all",
  },
  {
    image: "/productcollection/Bath.svg",
    icon: "/productcollection/BathIcon.svg",
    name: "Bathroom Fixtures",
    para: "Explore our vast selection at ‘The Creative Store’- your one-stop destination for all construction and building needs. ",
    button: "See all",
  },
  {
    image: "/productcollection/Ec.svg",
    icon: "/productcollection/EcIcon.svg",
    name: "Electricals & Lighting",
    para: "Explore our vast selection at ‘The Creative Store’- your one-stop destination for all construction and building needs. ",
    button: "See all",
  },
  {
    image: "/productcollection/Tiles.svg",
    icon: "/productcollection/TilesIcon.svg",
    name: "Tiles & Floorings",
    para: "Explore our vast selection at ‘The Creative Store’- your one-stop destination for all construction and building needs. ",
    button: "See all",
  },
  {
    image: "/productcollection/Paints.svg",
    icon: "/productcollection/PaintsIcon.svg",
    name: "Paints & Coatings",
    para: "Explore our vast selection at ‘The Creative Store’- your one-stop destination for all construction and building needs.",
    button: "See all",
  },
];

const ProductCollection = () => {
  const router = useRouter();
  const [categoreyLoading, setCategoreyLoading] = useState(false);
  const [categoreyData, setCategoreyData] = useState([]);
  const [categoreyId, setCategoreyId] = useState("");
  const [subCategoreyId, setSubCategoreyId] = useState("");

  const iconArray = [
    "/productcollection/PaintsIcon.svg",
    "/productcollection/TilesIcon.svg",
    "/productcollection/EcIcon.svg",
    "/productcollection/BathIcon.svg",
    "/productcollection/BuildIcon.svg",
  ];
  useEffect(() => {
    browseCategoriesDatahandler();
  }, []);

  const ProductHandler = (cat, subCat) => {
    router.push(`/product/${cat}/${subCat ? subCat : ""}`);
  };

  const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const browseCategoriesDatahandler = async () => {
    try {
      setCategoreyLoading(true);
      const { data, message, success } = await categorySubCategoryList();
      if (success) {
        setCategoreyData(data);
      } else {
        setCategoreyData([]);
      }
    } catch (err) {
      console.error("Error", err);
    } finally {
      setCategoreyLoading(false);
    }
  };

  const categoreySubcategoryHandler = (id) => {
    setCategoreyId(id);
  };

  return (
    <div className="z-20 relative bg-bgsecondary lg:py-16 md:py-12 sm:py-10 py-8">
      <div className="container">
        <Heading head={"Our Offerings"} para={"Browse Categories"} />
      </div>
      <div className="md:pt-10 sm:pt-8 pt-6 container px-3 sm:px-6">
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {categoreyData && categoreyData.length > 0 ? (
              categoreyData.map((response, index) => {
                const { id, image, name, status, subCategorys } =
                  response || {};
                return (
                  <CarouselItem
                    className="xl:basis-1/4 md:basis-1/3 xs:basis-1/2 overflow-visible"
                    key={index}
                  >
                    <div
                      key={index}
                      className="col-span-1 bg-white rounded-2xl p-4 xs:m-0 mx-2"
                    >
                      <div>
                        <Image
                          alt={""}
                          width={300}
                          height={240}
                          className="w-full lg:h-60 sm:h-48 h-36 object-contain rounded-lg"
                          src={image}
                        />
                        <div className="lg:text-[22px] text-lg font-semibold mt-2 mb-1">
                          {name ? name : "-"}
                        </div>
                        <div className="my-3">
                          <Select
                            onValueChange={(event) => [
                              setSubCategoreyId(event),
                              ProductHandler(id, event),
                            ]}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Sub Categories" />
                            </SelectTrigger>
                            <SelectContent>
                              {subCategorys && subCategorys.length > 0 ? (
                                subCategorys.map((res, index) => {
                                  const {
                                    categoryId,
                                    createdAt,
                                    id,
                                    image,
                                    name,
                                    status,
                                  } = res || {};
                                  return (
                                    <SelectItem value={id}>
                                      {name ? name : "-"}
                                    </SelectItem>
                                  );
                                })
                              ) : (
                                <div className="text-[#5D5F5F] text-center">
                                  No Category Found
                                </div>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="">
                            <Button
                              size={"card"}
                              variant="card"
                              onClick={() => [
                                categoreySubcategoryHandler(id),
                                ProductHandler(id, null),
                              ]}
                            >
                              See all
                            </Button>
                          </div>
                          <div>
                            <Image
                              alt={""}
                              width={45}
                              height={40}
                              className="object-cover"
                              src={getRandomItem(iconArray)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })
            ) : (
              <div className="text-[#5D5F5F] text-center">
                No Category Found
              </div>
            )}
          </CarouselContent>
          <div className="relative w-fit m-auto sm:mt-8 mt-6">
            <div className="slide_arrow_box bg-white md:w-[84px] w-[60px] md:h-11 h-8 rounded-full">
              <CarouselPrevious className="bottom-0 md:top-[22px] md:left-2 left-1 border-0" />
              <CarouselNext className="bottom-0 md:top-[22px] md:right-2 right-1 border-0" />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCollection;
