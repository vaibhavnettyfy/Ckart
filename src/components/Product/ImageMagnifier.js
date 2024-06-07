import Image from "next/image";
import React, { useEffect, useState } from "react";

const images = [
  "/cover.png",
  "/dummyimage.png",
  "/cover.png",
  "/dummyimage.png",
];

const ImageMagnifier = ({ zoomLevel = 2, src }) => {
  const ImageSource = src && src.map((res) => res.original);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const [isHovered, setIsHovered] = useState(false);
  const [image, setImage] = useState(ImageSource[0]);

  useEffect(() => {
    if (ImageSource && ImageSource[0]) {
      setImage(ImageSource[0]);
    }
  }, [ImageSource]);

  const handleClick = (ele) => {
    setImage(ele);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div className="relative flex space-x-4">
        <div className="image-magnifier relative w-full sm:h-[500px] h-[300px] overflow-hidden border">
          <Image
            src={image}
            alt="Zoom"
            layout="fill"
            objectFit="contain"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
        {isHovered && (
          <div className="image-magnifier-preview w-full sm:block hidden sm:h-[500px] h-[300px] border">
            <div
              className="h-full"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: `${zoomLevel * 100}%`,
                backgroundPosition,
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-6 gap-3 mt-3">
        {ImageSource.map((ele, i) => {
          return (
            <div
              key={i}
              onClick={() => handleClick(ele)}
              className="cursor-pointer"
            >
              <Image
                src={ele}
                width={500}
                height={500}
                className="object-cover w-full sm:h-[80px] h-[50px]"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageMagnifier;
