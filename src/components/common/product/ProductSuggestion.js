import Heading from "../Heading"
import ProductCard from "./ProductCard"

export default function ProductSuggestion({ head, para }) {
  return (
    <>
      <div>
        <Heading head={head} para={para} />
      </div>
      <div className='md:py-10 sm:py-8 py-5 container px-3 sm:px-6'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:gap-5 md:gap-3 gap-2'>
          {[1, 1, 1, 1].map((data, i) => {
            return (
              <div key={i} className='col-span-1'>
                <ProductCard />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}