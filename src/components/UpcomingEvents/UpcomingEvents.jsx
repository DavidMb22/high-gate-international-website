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
    return { month: "", day: "" };
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return { month: "", day: "" };
  }

  return {
    month: parsedDate.toLocaleDateString("en-US", {
      month: "short",
    }),
    day: parsedDate.toLocaleDateString("en-US", {
      day: "2-digit",
    }),
  };
}

/* ==================================================
   CHECK SINGLE-DAY EVENT DATE/TIME
================================================== */

function isEventUpcoming(date, time) {
  if (!date) {
    return false;
  }

  const eventDateTime = time
    ? `${date}T${time}`
    : `${date}T23:59:59`;

  const parsedEventDate = new Date(eventDateTime);

  if (Number.isNaN(parsedEventDate.getTime())) {
    return false;
  }

  return parsedEventDate.getTime() >= Date.now();
}

/* ==================================================
   GET TODAY'S LOCAL DATE
================================================== */

function getTodayLocalDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* ==================================================
   CHECK WHETHER EVENT SHOULD BE VISIBLE
================================================== */

function isEventVisible(event, today) {
  // An event with an end date remains visible through that date.
  // The end date is inclusive and is not shown on the homepage.
  if (event.end_date) {
    return event.end_date >= today;
  }

  // Events without an end date retain the single-day behavior.
  return isEventUpcoming(event.event_date, event.event_time);
}

/* ==================================================
   UPCOMING EVENTS
================================================== */

function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  /* ==================================================
     LOAD PUBLISHED EVENTS THAT ARE UPCOMING OR ACTIVE
  ================================================== */

  useEffect(() => {
    let isMounted = true;

    const loadUpcomingEvents = async () => {
      setLoading(true);
      setLoadError("");

      const today = getTodayLocalDate();

      try {
        const { data, error } = await supabase
          .from("upcoming_events")
          .select(
            "id, title, description, event_date, end_date, event_time, flyer_image, status"
          )
          .eq("status", "published")
          .or(
            `event_date.gte.${today},and(event_date.lte.${today},end_date.gte.${today})`
          )
          .order("event_date", { ascending: true });

        if (error) {
          throw error;
        }

        if (isMounted) {
          const visibleEvents = (data || []).filter((event) =>
            isEventVisible(event, today)
          );

          setEvents(visibleEvents);
        }
      } catch (error) {
        console.error("Error loading upcoming events:", error);

        if (isMounted) {
          setEvents([]);
          setLoadError(
            "We couldn't load upcoming events. Please try again later."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUpcomingEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={styles.events}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.heading}>
          <div>
            <span className={styles.label}>What's Happening</span>

            <h2>Upcoming Events</h2>
          </div>

          <p>
            Stay up to date with the latest events, activities and important
            dates happening at High Gate International Academy.
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className={styles.sliderWrapper}>
            <article className={styles.card}>
              <div className={styles.imageWrapper} />

              <div className={styles.eventInfo}>
                <h3>Loading upcoming events...</h3>
              </div>
            </article>
          </div>
        ) : loadError ? (
          /* ERROR STATE */
          <div className={styles.emptyState}>
            <p>{loadError}</p>
          </div>
        ) : events.length > 0 ? (
          /* SLIDER */
          <div className={styles.sliderWrapper}>
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: ".events-prev",
                nextEl: ".events-next",
              }}
              autoplay={
                events.length > 1
                  ? {
                      delay: 5000,
                      disableOnInteraction: false,
                    }
                  : false
              }
              spaceBetween={30}
              slidesPerView={1}
              loop={events.length > 1}
              className={styles.swiper}
            >
              {events.map((event) => {
                const date = formatEventDate(event.event_date);

                return (
                  <SwiperSlide key={event.id}>
                    <article className={styles.card}>
                      {/* FLYER */}
                      <div className={styles.imageWrapper}>
                        {event.flyer_image && (
                          <img
                            src={event.flyer_image}
                            alt={event.title || "School event flyer"}
                            className={styles.eventImage}
                          />
                        )}
                      </div>

                      {/* EVENT INFORMATION */}
                      <div className={styles.eventInfo}>
                        <div className={styles.date}>
                          <span className={styles.month}>{date.month}</span>

                          <span className={styles.day}>{date.day}</span>
                        </div>

                        <h3>{event.title}</h3>

                        {event.description && <p>{event.description}</p>}

                        {event.event_time && (
                          <div className={styles.details}>
                            <span>
                              <Clock size={17} />
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

            {/* SLIDER ARROWS */}
            {events.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.sliderButton} ${styles.prev} events-prev`}
                  aria-label="Previous event"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  className={`${styles.sliderButton} ${styles.next} events-next`}
                  aria-label="Next event"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className={styles.emptyState}>
            <p>There are no upcoming events at the moment.</p>
          </div>
        )}

        {/* SCHOOL CALENDAR */}
        <div className={styles.buttonWrapper}>
          <Link to="/admissions/calendar" className={styles.button}>
            View School Calendar
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;