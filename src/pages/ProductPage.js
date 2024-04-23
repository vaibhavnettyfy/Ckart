"use client";
import Product from "@/components/Product/Product";

export default function ProductPage({categories,subCategories}) {
  return (
    <Product categories={categories}  subCategories={subCategories}/>
  );
}
