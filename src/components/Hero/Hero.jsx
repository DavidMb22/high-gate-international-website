import styles from "./Hero.module.css";

import { heroSlides } from "../../data/heroSlides";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function Hero() {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{
        delay: 5000,
      }}
      loop={true}
      className={styles.hero}
    >
      {heroSlides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div
            className={styles.slide}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className={styles.overlay}>
              <p>{slide.subtitle}</p>

              <h1>
                {slide.title.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </h1>

              <button>{slide.button}</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Hero;