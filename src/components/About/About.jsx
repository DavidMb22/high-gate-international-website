import styles from "./About.module.css";

import { useState } from "react";
import Skeleton from "../Skeleton/Skeleton";
import useImageLoader from "../../hooks/useImageLoader";
import aboutMain from "../../assets/images/about/about-main.JPG";
import aboutSmall1 from "../../assets/images/about/about-small-1.JPG";
import aboutSmall2 from "../../assets/images/about/about-small-2.JPG";
import aboutSmall3 from "../../assets/images/about/about-small-3.JPG";

function AboutImage({
  src,
  alt,
  className,
}) {

  const loaded = useImageLoader(src);

  return (
    <div className={styles.imageContainer}>

      {!loaded && (
        <Skeleton
          className={styles.imageSkeleton}
        />
      )}

      <img
        src={src}
        alt={alt}
        className={`${className} ${
          loaded ? styles.imageLoaded : ""
        }`}
        onLoad={() => setLoaded(true)}
      />

    </div>
  );
}

function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>

        {/* =========================
            TEXT CONTENT
        ========================= */}

        <div className={styles.content}>

          <span className={styles.sectionLabel}>
            Who we are
          </span>

          <h2>
            Growing Minds,
            <br />
            Building Futures.
          </h2>

          <p className={styles.intro}>
            High Gate International Academy is a modern
            international school committed to providing
            quality education in a safe, inclusive and
            inspiring environment.
          </p>

          {/* QUALITY EDUCATION */}

          <div className={styles.value}>
            <h3>
              Quality Education
            </h3>

            <p>
              We provide a strong academic foundation
              that encourages students to learn, discover
              and develop their potential.
            </p>
          </div>

          {/* INCLUSIVE COMMUNITY */}

          <div className={styles.value}>
            <h3>
              Inclusive Community
            </h3>

            <p>
              We create a welcoming environment where
              every student is valued, supported and
              encouraged to grow.
            </p>
          </div>

          {/* ACADEMIC EXCELLENCE */}

          <div className={styles.value}>
            <h3>
              Academic Excellence
            </h3>

            <p>
              Our approach combines strong teaching,
              technology and meaningful learning
              experiences to prepare students for the
              future.
            </p>
          </div>

          <button className={styles.button}>
            Learn More
          </button>

        </div>


        {/* =========================
            PHOTO COLLAGE
        ========================= */}

        <div className={styles.gallery}>

          <div className={styles.mainImage}>
            <img
              src={aboutMain}
              alt="High Gate students learning"
              className={styles.mainImage}
            />
          </div>

          <div className={styles.smallImageOne}>
            <img
              src={aboutSmall1}
              alt="Students at High Gate"
              className={styles.mainImage}
            />
          </div>

          <div className={styles.smallImageTwo}>
            <img
              src={aboutSmall2}
              alt="High Gate school activity"
            />
          </div>

          <div className={styles.smallImageThree}>
            <img
              src={aboutSmall3}
              alt="High Gate students"
              className={styles.mainImage}
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;