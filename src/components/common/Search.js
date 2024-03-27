import React from 'react'
import Image from 'next/image'

const Search = () => {
  return (
    <div className="relative mx-auto text-gray-600 xl:w-[550px] md:w-[350px]">
      <input className="bg-white w-full md:px-4 px-3 md:py-[10px] py-2 pr-10 rounded-md text-[#77878F] text-sm focus:outline-none"
        type="search" name="search" placeholder="Search for anything..." />
      <button type="submit" className="absolute right-0 top-0 mt-[10px] mr-3">
        <Image src={'/header/Search.svg'} alt="" width={20} height={20} className="md:w-5 w-4 md:h-5" />
      </button>
    </div>
  )
}

export default Search