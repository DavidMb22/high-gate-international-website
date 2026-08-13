import styles from "./AdmissionsCTA.module.css";

import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

import useImageLoader from "../../hooks/useImageLoader";

import admissionsImage from "../../assets/images/admissions/admissions.JPG";

function AdmissionsImage() {

  const loaded = useImageLoader(src);

  return (
    <div className={styles.imageWrapper}>

      {!loaded && (
        <Skeleton
          className={styles.imageSkeleton}
        />
      )}

      <img
        src={admissionsImage}
        alt="High Gate students"
        className={loaded ? styles.imageLoaded : ""}
        onLoad={() => setLoaded(true)}
      />

      <div className={styles.imageBadge}>

        <strong>
          2026–2027
        </strong>

        <span>
          Admissions Open
        </span>

      </div>

    </div>
  );
}

function AdmissionsCTA() {
  return (
    <section className={styles.admissions}>

      <div className={styles.container}>

        {/* =========================
            CONTENT
        ========================= */}

        <div className={styles.content}>

          <span className={styles.label}>
            Admissions
          </span>

          <h2>
            Give your child
            <br />
            the right start.
          </h2>

          <p>
            Discover an environment where students
            are encouraged to learn, explore, grow
            and prepare for a bright future.
          </p>

          <Link
            to="/admissions"
            className={styles.button}
          >
            Explore Admissions

            <ArrowRight size={18} />

          </Link>

        </div>


        {/* =========================
            IMAGE
        ========================= */}

        <div className={styles.imageWrapper}>

          <img
            src={admissionsImage}
            alt="High Gate students"
          />

          <div className={styles.imageBadge}>

            <strong>
              2026–2027
            </strong>

            <span>
              Admissions Open
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AdmissionsCTA;