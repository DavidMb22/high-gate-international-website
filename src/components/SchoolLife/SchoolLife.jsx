import styles from "./SchoolLife.module.css";

import { ArrowUpRight, ArrowRight } from "lucide-react";

import { schoolLifeEvents } from "../../data/schoolLife";

import useImageLoader from "../../hooks/useImageLoader";

function EventImage({
  src,
  alt,
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
        src={event.image}
        alt={event.title}
        className={`${styles.eventImage} ${
          loaded ? styles.imageLoaded : ""
        }`}
        onLoad={() => setLoaded(true)}
      />

    </div>
  );
}

function SchoolLife() {
  // Show only the first 3 events on the homepage
  const featuredEvents = schoolLifeEvents.slice(0, 3);

  return (
    <section className={styles.schoolLife}>
      <div className={styles.container}>

        {/* =========================
            SECTION HEADING
        ========================= */}

        <div className={styles.heading}>

          <div>
            <span className={styles.label}>
              School Life
            </span>

            <h2>
              More than
              <br />
              a classroom.
            </h2>
          </div>

          <p>
            At High Gate, learning happens everywhere.
            From sports and celebrations to cultural
            activities and community events, every
            experience becomes part of the journey.
          </p>

        </div>


        {/* =========================
            FEATURED EVENTS
        ========================= */}

        <div className={styles.events}>

          {featuredEvents.map((event) => (

            <a
              key={event.id}
              href={event.photosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >

              <div className={styles.imageWrapper}>

                <img
                  src={event.image}
                  alt={event.title}
                />

                <span className={styles.viewIcon}>
                  <ArrowUpRight size={20} />
                </span>

              </div>


              <div className={styles.cardContent}>

                <span className={styles.year}>
                  {event.academicYear}
                </span>

                <h3>
                  {event.title}
                </h3>

                <p>
                  {event.description}
                </p>

                <span className={styles.viewPhotos}>
                  View Photos
                  <ArrowUpRight size={16} />
                </span>

              </div>

            </a>

          ))}

        </div>


        {/* =========================
            VIEW MORE
        ========================= */}

        <div className={styles.viewMoreWrapper}>

          <a
            href="/school-life"
            className={styles.viewMore}
          >
            View More

            <ArrowRight size={18} />

          </a>

        </div>

      </div>
    </section>
  );
}

export default SchoolLife;