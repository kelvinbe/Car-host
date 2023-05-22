import React, { useCallback, useEffect, useState } from "react";
import { BannerSlides, Slide } from "./BannerSlides";
import { Box } from "@chakra-ui/react";
import Vector from "../../../public/images/Vector.png";
import Vector_2 from "../../../public/images/Vector_2.png";
import girl from "../../../public/images/girl.png";

const Banner = () => {
  const img = `linear-gradient(107.56deg, rgba(230, 59, 46, 0.75) 0%, rgba(255, 139, 131, 0.75) 100%), url(${girl.src})`;

  const [currentSlide, setCurrentSlide] = useState(1);

  const data:{
    id:number;
    image:string; 
    disImage?:string
  }[] = [
    {
      id: 1,
      image: Vector.src,
      disImage: "joinedImage.png",
    },
    {
      id: 2,
      image: Vector_2.src,
      disImage: "joined_2.png",
    },
    {
      id: 3,
      image: img,
    },
    {
      id: 4,
      image: "",
      disImage: "group.png",
    },
  ];

  const move = useCallback(() => {
    if (currentSlide === data.length) {
      setCurrentSlide(1);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide, data.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      move();
    }, 8000);

    return () => {
      clearInterval(intervalId);
    };
  }, [move]);

  return (
    <Box
      w="full"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      id="banner"
    >
      {data.length > 0 &&
        data.map((banner) => {
          return (
            <section key={banner.id}>
              {banner.id === 1 && currentSlide === 1 ? (
                <BannerSlides banner={banner} key={banner.id} />
              ) : banner.id === 2 && currentSlide === 2 ? (
                <BannerSlides banner={banner} key={banner.id} />
              ) : banner.id === 3 && currentSlide === 3 ? (
                <BannerSlides banner={banner} key={banner.id} />
              ) : banner.id === 4 && currentSlide === 4 ? (
                <Slide banner={banner} key={banner.id} />
              ) : null}
            </section>
          );
        })}
    </Box>
  );
};

export default Banner;
