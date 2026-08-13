import styles from "./Partners.module.css";

import { useState } from "react";

import Skeleton from "../Skeleton/Skeleton";
import useImageLoader from "../../hooks/useImageLoader";

import cambridge from "../../assets/images/partners/cambridge.png";
import canada from "../../assets/images/partners/canada.png";
import delf from "../../assets/images/partners/delf.png";
import frenchEmbassy from "../../assets/images/partners/french-embassy.png";
import britishCouncil from "../../assets/images/partners/british-council.png";
import institutFrancais from "../../assets/images/partners/institut-francais.png";

const partners = [
  {
    name: "Cambridge Assessment International Education",
    image: cambridge,
  },
  {
    name: "Canadian Education",
    image: canada,
  },
  {
    name: "DELF",
    image: delf,
  },
  {
    name: "French Embassy in Rwanda",
    image: frenchEmbassy,
  },
  {
    name: "British Council",
    image: britishCouncil,
  },
  {
    name: "Institut Français",
    image: institutFrancais,
  },
];

function PartnerLogo({
  src,
  alt,
}) {

  const loaded = useImageLoader(src);

  return (
    <div className={styles.logoContainer}>

      {!loaded && (
        <Skeleton
          className={styles.logoSkeleton}
        />
      )}

      <img
        src={src}
        alt={alt}
        className={`${styles.partnerLogo} ${
          loaded ? styles.imageLoaded : ""
        }`}
        onLoad={() => setLoaded(true)}
      />

    </div>
  );
}

function Partners() {
  return (
    <section className={styles.partners}>
      <div className={styles.container}>

        {/* Section Heading */}

        <div className={styles.heading}>

          <div className={styles.labelWrapper}>
            <span className={styles.label}>
              Our Partners
            </span>
          </div>

          <h2>
            Learning beyond
            <br />
            our classrooms.
          </h2>

          <p>
            We work with trusted educational organizations
            and institutions to enrich our students' learning
            experiences and provide internationally
            recognized opportunities.
          </p>

        </div>


        {/* Partner Logos */}

        <div className={styles.logoGrid}>

          {partners.map((partner) => (
            <div
              className={styles.logoCard}
              key={partner.name}
            >
              <img
                src={partner.image}
                alt={partner.name}
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Partners;