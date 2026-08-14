import styles from "./Hero.module.css";
import { heroSlides } from "../../data/heroSlides";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Skeleton from "../Skeleton/Skeleton";
import useImageLoader from "../../hooks/useImageLoader";

function HeroSlide({ slide }) {
  const loaded = useImageLoader(slide.image);

  return (
    <div className={styles.slideWrapper}>

      {!loaded && (
        <Skeleton className={styles.heroSkeleton} />
      )}

      <div
        className={`${styles.slide} ${
          loaded ? styles.slideLoaded : ""
        }`}
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

    </div>
  );
}

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
          <HeroSlide slide={slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Hero;