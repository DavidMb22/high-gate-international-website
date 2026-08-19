import { useEffect, useState } from "react";

import styles from "./UpcomingEvents.module.css";

import {
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { supabase } from "../../lib/supabase";

import "swiper/css";
import "swiper/css/navigation";


/* ==================================================
   FORMAT EVENT DATE
================================================== */

function formatEventDate(date) {
  if (!date) {
    return {
      month: "",
      day: "",
    };
  }

  const parsedDate = new Date(
    `${date}T00:00:00`
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return {
      month: "",
      day: "",
    };
  }

  return {
    month: parsedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
      }
    ),

    day: parsedDate.toLocaleDateString(
      "en-US",
      {
        day: "2-digit",
      }
    ),
  };
}


/* ==================================================
   UPCOMING EVENTS
================================================== */

function UpcomingEvents() {

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  /* ==================================================
     LOAD UPCOMING EVENTS
  ================================================== */

  useEffect(() => {

    const loadUpcomingEvents = async () => {

      const today =
        new Date()
          .toISOString()
          .split("T")[0];


      const { data, error } =
        await supabase
          .from("upcoming_events")
          .select("*")
          .eq("status", "published")
          .gte("event_date", today)
          .order("event_date", {
            ascending: true,
          })
          .limit(6);


      if (error) {

        console.error(
          "Error loading upcoming events:",
          error
        );

        setEvents([]);
        setLoading(false);

        return;
      }


      setEvents(data || []);
      setLoading(false);
    };


    loadUpcomingEvents();

  }, []);


  return (

    <section className={styles.events}>

      <div className={styles.container}>


        {/* ==================================================
            HEADER
        ================================================== */}

        <div className={styles.heading}>

          <div>

            <span className={styles.label}>
              What's Happening
            </span>

            <h2>
              Upcoming Events
            </h2>

          </div>


          <p>
            Stay up to date with the latest events,
            activities and important dates happening
            at High Gate International Academy.
          </p>

        </div>


        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (

          <div className={styles.sliderWrapper}>

            <article className={styles.card}>

              <div
                className={
                  styles.imageWrapper
                }
              />

              <div
                className={
                  styles.eventInfo
                }
              >

                <h3>
                  Loading upcoming events...
                </h3>

              </div>

            </article>

          </div>


        ) : events.length > 0 ? (

          /* ==================================================
             SLIDER
          ================================================== */

          <div className={styles.sliderWrapper}>

            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: ".events-prev",
                nextEl: ".events-next",
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              spaceBetween={30}
              slidesPerView={1}
              loop={events.length > 1}
              className={styles.swiper}
            >

              {events.map((event) => {

                const date =
                  formatEventDate(
                    event.event_date
                  );


                return (

                  <SwiperSlide
                    key={event.id}
                  >

                    <article
                      className={styles.card}
                    >


                      {/* =========================
                          FLYER
                      ========================= */}

                      <div className={styles.imageWrapper}>
                        {event.flyer_image && (
                          <img
                            src={event.flyer_image}
                            alt={event.title}
                            className={styles.eventImage}
                          />
                        )}
                      </div>


                      {/* =========================
                          EVENT INFORMATION
                      ========================= */}

                      <div
                        className={
                          styles.eventInfo
                        }
                      >


                        {/* DATE */}

                        <div
                          className={
                            styles.date
                          }
                        >

                          <span
                            className={
                              styles.month
                            }
                          >
                            {date.month}
                          </span>

                          <span
                            className={
                              styles.day
                            }
                          >
                            {date.day}
                          </span>

                        </div>


                        {/* TITLE */}

                        <h3>
                          {event.title}
                        </h3>


                        {/* DESCRIPTION */}

                        {event.description && (

                          <p>
                            {event.description}
                          </p>

                        )}


                        {/* TIME */}

                        {event.event_time && (

                          <div
                            className={
                              styles.details
                            }
                          >

                            <span>

                              <Clock
                                size={17}
                              />

                              {event.event_time}

                            </span>

                          </div>

                        )}

                      </div>

                    </article>

                  </SwiperSlide>

                );
              })}

            </Swiper>


            {/* ==================================================
                SLIDER ARROWS
            ================================================== */}

            {events.length > 1 && (

              <>

                <button
                  className={`
                    ${styles.sliderButton}
                    ${styles.prev}
                    events-prev
                  `}
                  aria-label="Previous event"
                >

                  <ChevronLeft
                    size={20}
                  />

                </button>


                <button
                  className={`
                    ${styles.sliderButton}
                    ${styles.next}
                    events-next
                  `}
                  aria-label="Next event"
                >

                  <ChevronRight
                    size={20}
                  />

                </button>

              </>

            )}

          </div>


        ) : (

          /* ==================================================
             EMPTY STATE
          ================================================== */

          <div
            className={
              styles.emptyState
            }
          >

            <p>
              There are no upcoming events
              at the moment.
            </p>

          </div>

        )}


        {/* ==================================================
            SCHOOL CALENDAR
        ================================================== */}

        <div
          className={
            styles.buttonWrapper
          }
        >

          <Link
            to="/admissions/calendar"
            className={styles.button}
          >

            View School Calendar

            <ArrowRight
              size={18}
            />

          </Link>

        </div>


      </div>

    </section>
  );
}


export default UpcomingEvents;