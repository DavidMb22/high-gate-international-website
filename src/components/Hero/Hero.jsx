import styles from "./Hero.module.css";

import { heroSlides } from "../../data/heroSlides";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import useImageLoader from "../../hooks/useImageLoader";

import "swiper/css";
import "swiper/css/navigation";


function HeroSlide({ slide, t }) {
  const loaded = useImageLoader(slide.image);

  const subtitle = t(slide.subtitleKey);
  const title = t(slide.titleKey);
  const button = t(slide.buttonKey);

  /* =========================
     LOADING STATE
  ========================= */

  if (!loaded) {
    return (
      <div className={styles.slideSkeleton}>

        <div className={styles.skeletonSubtitle}></div>

        <div className={styles.skeletonTitle}></div>

        <div className={styles.skeletonButton}></div>

      </div>
    );
  }


  /* =========================
     LOADED STATE
  ========================= */

  return (
    <div
      className={styles.slide}
      style={{
        backgroundImage: `url("${slide.image}")`,
      }}
    >

      <div className={styles.overlay}>

        <p>
          {subtitle}
        </p>


        <h1>
          {title.split("\n").map((line, lineIndex) => (

            <span key={lineIndex}>

              {line}

              {lineIndex < title.split("\n").length - 1 && (
                <br />
              )}

            </span>

          ))}
        </h1>


        <Link
          to={slide.path || "/admissions"}
          className={styles.heroButton}
        >
          {button}
        </Link>

      </div>

    </div>
  );
}


function Hero() {

  const { t } = useTranslation();

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation

      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}

      loop={true}

      className={styles.hero}
    >

      {heroSlides.map((slide, index) => (

        <SwiperSlide key={index}>

          <HeroSlide
            slide={slide}
            t={t}
          />

        </SwiperSlide>

      ))}

    </Swiper>
  );
}


export default Hero;