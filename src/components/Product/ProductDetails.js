"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProductSuggestion from "../common/product/ProductSuggestion";
import QtyCard from "../common/product/QtyCard";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import BookAppointment from "../common/modal/BookAppointment";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Cookies from "universal-cookie";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Flag, Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  addproductApiWishlist,
  removeproductApiWishlist,
} from "@/Service/WishList/WishList.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { errorNotification, successNotification } from "@/helper/Notification";
import { useAppContext } from "@/context";
import { addProductApiToCart } from "@/Service/AddTocart/AddToCart.service";
import ProductDescription from "../ProductDescription";
import { useFormik } from "formik";
import { updateLocationIv } from "@/helper/intialValues";
import { updateLocationValidation } from "@/helper/Validation";
import { getDetailsByPincode } from "@/helper";
import ProDetailSke from "../common/Skeleton/ProDetailSke";
import ImageMagnifier from "./ImageMagnifier";
import Whyus from "./Whyus";
import { Faq } from "./Faq";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { productVariantDropdown } from "@/Service/Product/Product.service";
import ProductDetailsPage from "@/pages/ProductDetailsPage";

export default function ProductDetails({
  detailsData,
  callBackHandler,
  productDetailsLoader,
}) {
  const {
    brand,
    category,
    description,
    id,
    isWishlist,
    parentId,
    mrp,
    maxQuantity,
    minQuantity,
    pieces,
    price,
    productImage,
    productKey,
    productName,
    quantity,
    specification,
    sponsor,
    faq,
    subCategory,
    features,
    tax,
  } = detailsData || {};
  const router = useRouter();
  const cookies = new Cookies();
  const [wishList, setWishList] = useState(false);
  const [selectedQuantitys, setSelectedQuantitys] = useState(1);
  const [productsImage, setProductImage] = useState([]);
  const [variantList, setVarientList] = useState([]);
  const [open, setOpen] = useState(false);
  const userLoginFlag = cookies.get("token");
  const userDetails = cookies.get("USERDETAILS");
  const cartId = cookies.get("CARTID");
  const { setDeliveryAddress, deliveryAddress } = useAppContext();

  const setQuantityHandler = (value) => {
    setSelectedQuantitys(value);
  };

  const ImageHandler = (image) => {
    const data =
      image && image.length > 0
        ? image.map((res) => {
            return {
              original: res.image ? res.image : "",
              thumbnail: res.image ? res.image : "",
            };
          })
        : [];
    setProductImage(data);
  };

  useEffect(() => {
    setSelectedQuantitys(minQuantity);
  }, [minQuantity]);

  const updateLocationHandler = async () => {
    const response = await getDetailsByPincode(formik.values.pincode);
    if (response.data.status == "OK") {
      const location = response.data.results[0].address_components;
      const l1 = response.data.results[0];
      const payload = {
        postalCode: formik.values.pincode,
        suburb: location.find((component) =>
          component.types.includes("locality")
        ).long_name,
      };
      setDeliveryAddress(payload);
      cookies.set("deliveryAddress", payload);
      setOpen(false);
    } else {
      formik.setErrors({ pincode: "pincode is not a valid" });
    }
  };

  const formik = useFormik({
    initialValues: updateLocationIv,
    validationSchema: updateLocationValidation,
    onSubmit: updateLocationHandler,
  });

  useEffect(() => {
    ImageHandler(productImage);
  }, [productImage]);

  const addTocartHandler = async (buynowFlage) => {
    try {
      const payload = {
        productId: id,
        quantity: selectedQuantitys,
        userId: userDetails?.id ? userDetails?.id : "",
        pincode: deliveryAddress?.postalCode ? deliveryAddress?.postalCode : "",
      };
      const cartPayload = {
        productId: id,
        quantity: selectedQuantitys,
        id: cartId ? cartId : "",
        userId: userDetails?.id ? userDetails?.id : "",
        pincode: deliveryAddress?.postalCode ? deliveryAddress?.postalCode : "",
      };
      const { count, data, message, success } = await addProductApiToCart(
        cartId ? cartPayload : payload
      );
      if (success) {
        if (!cartId) {
          cookies.set("CARTID", data.cartId);
        }
        if (buynowFlage) {
          router.push("/cart");
        }
        successNotification(message);
        callBackHandler();
      } else {
        callBackHandler();
        errorNotification(message);
      }
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    if (parentId) {
      productVariantDropdownHandler(parentId);
    }
  }, [parentId]);

  const productVariantDropdownHandler = async (parentId) => {
    try {
      const { count, data, message, success } = await productVariantDropdown(
        parentId
      );

      if (success) {
        setVarientList(data);
      } else {
        setVarientList([]);
        console.error("Failed to fetch product variants:", message);
      }
    } catch (error) {
      console.error("Error fetching product variants:", error);
      setVarientList([]);
    }
  };

  const getProductKeyById = (id) => {
    const variant = variantList.find((variant) => variant.id === id);
    return variant ? variant.productKey : null;
  };

  const handleVariantSelect = (event) => {
    const selectedVariantId = event;
    const productKey = getProductKeyById(selectedVariantId);

    console.log("selectedVariantId", productKey);
    if (productKey) {
      router.push(`/product-details/${productKey}`);
    }
  };
  const wishListHanlder = async () => {
    if (userLoginFlag) {
      if (isWishlist) {
        const { data, message, success } = await removeproductApiWishlist(id);
        if (success) {
          callBackHandler();
          successNotification(message);
        } else {
          errorNotification(message);
        }
      } else {
        const payload = {
          productId: id,
        };
        const { count, data, message, success } = await addproductApiWishlist(
          payload
        );
        if (success) {
          callBackHandler();
          successNotification(message);
        } else {
          errorNotification(message);
        }
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="lg:my-20 !mb-0 md:my-16 sm:my-10 my-5">
      {productDetailsLoader ? (
        <div className="container px-3 sm:px-6">
          <ProDetailSke />
        </div>
      ) : (
        <div className="container px-3 sm:px-6">
          <div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="col-span-1">
                {/* <ImageGallery items={productsImage} autoPlay={true} /> */}
                <ImageMagnifier
                  // src="https://via.placeholder.com/600"
                  src={productsImage}
                  zoomLevel={3}
                />
              </div>
              <div>
                <div>
                  <div className="lg:text-[22px] md:text-xl text-lg font-semibold mb-2">
                    {productName ? productName : "-"}
                  </div>
                  {specification && specification.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {specification.map((response) => {
                        const { id, key, productId, value } = response;
                        return (
                          <div className="text-lg border px-4 py-1 rounded-lg">
                            <span>{key ? key : "-"}</span> :{" "}
                            <span className="font-semibold">
                              {value ? value : "-"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="my-5">
                    <Separator />
                  </div>
                  {/* <div className="text-[#42545E] font-normal sm:text-base text-sm">
                    {description ? description : "-"}
                  </div> */}
                  <div className="my-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <div className="sm:text-sm text-xs font-semibold">
                          <span className="text-[#5F6C72] font-normal">
                            Availability :{" "}
                          </span>{" "}
                          {quantity ? (
                            <span className="text-green">In Stock</span>
                          ) : (
                            <span className="text-[#DA3E31]">Out of stock</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="sm:text-sm text-xs font-semibold">
                          <span className="text-[#5F6C72] font-normal">
                            Brand :{" "}
                          </span>{" "}
                          {brand ? brand : "-"}
                        </div>
                        <div className="sm:text-sm text-xs font-semibold">
                          <span className="text-[#5F6C72] font-normal">
                            Category :{" "}
                          </span>{" "}
                          {category ? category?.name : "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="">Variants</Label>
                      <Select onValueChange={handleVariantSelect}>
                        <SelectTrigger className="">
                          <SelectValue placeholder={productName} />
                        </SelectTrigger>
                        <SelectContent>
                          {variantList && variantList.length > 0 ? (
                            variantList.map((item, index) => {
                              return (
                                <SelectItem key={index} value={item.id}>
                                  {item.productName}
                                </SelectItem>
                              );
                            })
                          ) : (
                            <div className="text-[#5D5F5F] text-center">
                              No Product Found
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="font-semibold text-primary lg:text-2xl md:text-xl text-lg">
                      {`₹ ${price ? price : 0}`}
                    </div>
                    <div className="text-[#77878F] lg:text-lg md:text-base text-sm font-normal line-through">
                      {mrp && `₹ ${mrp}`}
                    </div>
                    <HoverCard>
                      <HoverCardTrigger>
                        <Info className="w-4 cursor-pointer text-black bg-[#ffed32] h-fit rounded-full" />
                      </HoverCardTrigger>
                      <HoverCardContent className="p-3 w-48">
                        <div className="grid gap-1">
                          <div className="flex justify-between">
                            <div>Product cost :</div>
                            <div className="text-primary font-medium">
                              ₹ {price ? price : 0}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div>GST :</div>
                            <div className="text-primary font-medium">
                              {tax}
                            </div>
                          </div>
                          <div>
                            <div className="text-primary font-semibold">
                              Free Delivery
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    {/* <div className="text-sm px-2 py-1 bg-[#EFD33D] font-semibold rounded-sm ml-2">
                    21% OFF
                  </div> */}
                  </div>
                </div>
                <div className="my-5">
                  <Separator />
                </div>
                <div>
                  <div>
                    <QtyCard
                      className="w-[150px]"
                      setQuantity={setQuantityHandler}
                      quantity={selectedQuantitys}
                    />
                  </div>
                  <div className="flex flex-wrap sm:gap-3 gap-2 sm:my-5 my-3">
                    <Button
                      size={"lg"}
                      className="shadow-none"
                      onClick={() => addTocartHandler()}
                    >
                      <div className="flex gap-2 items-center">
                        <div>Add to cart</div>
                        <Image
                          alt={""}
                          width={20}
                          height={20}
                          className="object-contain"
                          src={"/details/ShoppingCart.svg"}
                        />
                      </div>
                    </Button>
                    <BookAppointment
                      button={
                        <Button
                          size="lg"
                          className="shadow-none"
                          variant="outline"
                        >
                          Book Appointment
                        </Button>
                      }
                    />
                    <Button
                      size="lg"
                      className="shadow-none"
                      variant="outline"
                      onClick={() => addTocartHandler(true)}
                    >
                      Buy now
                    </Button>
                  </div>
                  <div className="border rounded-lg py-2 px-3 w-fit">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              <div className="md:text-lg sm:text-base text-sm font-normal">
                                Delivery Pincode:-{" "}
                                <span className="font-semibold">
                                  {deliveryAddress?.postalCode
                                    ? deliveryAddress?.postalCode
                                    : "-"}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click to change Pincode</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Choose your location</DialogTitle>
                          <div className="flex flex-col gap-7 !mt-5">
                            <div>
                              <Label htmlFor="" className="h-4 inline">
                                Enter an Indian pincode
                              </Label>
                              <div className="relative">
                                <Input
                                  placeholder=""
                                  className="w-full"
                                  name="pincode"
                                  formik={formik}
                                />
                                <Search className="absolute top-[10px] right-3 w-5 h-5" />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                onClick={() => formik.handleSubmit()}
                              >
                                Update
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setOpen(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="sm:mt-5 mt-3 sm:mb-7 mb-4">
                    <div className="flex gap-2 justify-between items-center sm:text-base text-sm">
                      <div className="flex gap-1 items-center">
                        <Image
                          alt={""}
                          width={24}
                          height={24}
                          className="cursor-pointer sm:w-6 sm:h-6 w-5 h-5"
                          src={
                            !isWishlist
                              ? "/details/Heart.svg"
                              : "/details/WishList.svg"
                          }
                          onClick={() => wishListHanlder(id, isWishlist)}
                        />
                        <div>Add to Wishlist</div>
                      </div>
                      <div className="flex gap-2 items-center sm:mr-10">
                        <div>Share product:</div>
                        <div className="flex gap-2 items-center">
                          <Image
                            alt={""}
                            width={20}
                            height={20}
                            className="cursor-pointer"
                            src={"/details/Copy.svg"}
                          />
                          <Image
                            alt={""}
                            width={16}
                            height={16}
                            className="cursor-pointer"
                            src={"/details/Facebook.svg"}
                          />
                          <Image
                            alt={""}
                            width={16}
                            height={16}
                            className="cursor-pointer"
                            src={"/details/Twitter.svg"}
                          />
                          <Image
                            alt={""}
                            width={16}
                            height={16}
                            className="cursor-pointer"
                            src={"/details/Pinterest.svg"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg px-5 py-4">
                    <div className="text-sm font-normal mb-2">
                      100% Guarantee Safe Checkout
                    </div>
                    <Image
                      alt={""}
                      width={312}
                      height={18}
                      className="object-contain"
                      src={"/PaymentMethod.svg"}
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <Tabs defaultValue="tab1" className="border rounded-lg">
                  <TabsList className="w-full bg-transparent border-b rounded-none">
                    <TabsTrigger value="tab1">Description</TabsTrigger>
                    {/* <TabsTrigger value="tab2">Additional information</TabsTrigger>
                  <TabsTrigger value="tab3">Specification</TabsTrigger>
                  <TabsTrigger value="tab4">Review</TabsTrigger> */}
                  </TabsList>
                  <TabsContent value="tab1">
                    <ProductDescription
                      description={description}
                      features={features}
                    />
                  </TabsContent>
                  {/* <TabsContent value="tab2">Additional information</TabsContent>
                <TabsContent value="tab3">Specification</TabsContent>
                <TabsContent value="tab4">Review</TabsContent> */}
                </Tabs>
              </div>
            </div>
          </div>
          <div className="my-10">
            <Separator />
          </div>
          {faq && faq.length > 0 && <Faq faqDetails={faq} />}
          <div className="mt-10">
            <ProductSuggestion head="Products" para="Related Products" />
          </div>
        </div>
      )}
      <Whyus />
    </div>
  );
}
