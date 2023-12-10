// CarouselBanner.jsx

/* eslint-disable @next/next/no-img-element */
import Img from "@/components/lazyLoadImage/Img";
import { baseImgUrl } from "@/utils/imgUrl";
import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Style from './carouselBanner.module.css';

const CarouselBanner = ({ data }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className={Style.carousel} activeIndex={index} onSelect={handleSelect}>
      {data?.slide?.map((slide) => (
        <Carousel.Item key={slide.id} className={Style.carouselItem}>
        <div className={Style.overlay}></div>
        <img src={baseImgUrl + slide?.image} className={`${Style.carouselImg}`} alt="" />
        <Carousel.Caption className={Style.carouselCaption}>
          <h3 className={Style.title}>{slide?.title}</h3>
          <p>{slide?.text1}</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      ))}
    </Carousel>
  );
};

export default CarouselBanner;
