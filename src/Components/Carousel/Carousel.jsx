import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./data";
import styles from "./Carousel.module.css"; // Importing CSS module

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, index) => (
          <div key={index} className={styles.hero__imgContainer}>
            <img
              src={imageItemLink}
              className={styles.hero__img}
              alt={`slide-${index}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
