import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ArrowUpRight, ArrowRight } from "lucide-react";

import { supabase } from "../../lib/supabase";

import styles from "./SchoolLife.module.css";


function SchoolLife() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadFeaturedEvents = async () => {

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", {
          ascending: false,
        })
        .limit(3);


      if (error) {

        console.error(
          "Error loading school events:",
          error
        );

        setEvents([]);
        setLoading(false);

        return;
      }


      setEvents(data || []);
      setLoading(false);
    };


    loadFeaturedEvents();

  }, []);


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

        {loading ? (

          <div className={styles.events}>

            {[1, 2, 3].map((item) => (

              <article
                key={item}
                className={styles.card}
              >

                <div
                  className={styles.imageWrapper}
                />

                <div
                  className={styles.cardContent}
                >

                  <span
                    className={styles.year}
                  >
                    Loading...
                  </span>

                  <h3>
                    Loading event...
                  </h3>

                  <p>
                    Please wait while we load
                    the latest school events.
                  </p>

                </div>

              </article>

            ))}

          </div>

        ) : events.length > 0 ? (

          <div className={styles.events}>

            {events.map((event) => (

              <article
                key={event.id}
                className={styles.card}
              >

                {/* =========================
                    IMAGE
                ========================= */}

                {event.cover_image && (

                  <div
                    className={
                      styles.imageWrapper
                    }
                  >

                    <img
                      src={event.cover_image}
                      alt={event.title}
                    />

                    {event.photos_url && (
                      <a
                        href={event.photos_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          styles.viewIcon
                        }
                        aria-label={`View photos for ${event.title}`}
                      >
                        <ArrowUpRight
                          size={20}
                        />
                      </a>
                    )}

                  </div>

                )}


                {/* =========================
                    CONTENT
                ========================= */}

                <div
                  className={
                    styles.cardContent
                  }
                >

                  {event.year && (

                    <span
                      className={styles.year}
                    >
                      {event.year}
                    </span>

                  )}


                  <h3>
                    {event.title}
                  </h3>


                  {event.description && (

                    <p>
                      {event.description}
                    </p>

                  )}


                  {event.photos_url && (

                    <a
                      href={event.photos_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        styles.viewPhotos
                      }
                    >
                      View Photos

                      <ArrowUpRight
                        size={16}
                      />
                    </a>

                  )}

                </div>

              </article>

            ))}

          </div>

        ) : (

          <div className={styles.emptyState}>

            <p>
              School events will appear here soon.
            </p>

          </div>

        )}



        {/* =========================
            VIEW MORE
        ========================= */}

        <div
          className={
            styles.viewMoreWrapper
          }
        >

          <Link
            to="/school-events"
            className={
              styles.viewMore
            }
          >
            View More

            <ArrowRight size={18} />

          </Link>

        </div>


      </div>

    </section>
  );
}


export default SchoolLife;