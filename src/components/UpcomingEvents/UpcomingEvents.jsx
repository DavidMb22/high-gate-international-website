import styles from "./UpcomingEvents.module.css";
import { useState } from "react";
import Skeleton from "../Skeleton/Skeleton";

import {
  Clock,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { upcomingEvents } from "../../data/upcomingEvents";

function EventImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={className}>

      {!loaded && (
        <Skeleton className={styles.imageSkeleton} />
      )}

      <img
        src={src}
        alt={alt}
        className={`${styles.eventImage} ${loaded ? styles.imageLoaded : ""
          }`}
        onLoad={() => setLoaded(true)}
      />

    </div>
  );
}

function UpcomingEvents() {
  return (
    <section className={styles.events}>

      <div className={styles.container}>

        {/* =========================
            HEADER
        ========================= */}

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


        {/* =========================
            SLIDER
        ========================= */}

        <div className={styles.sliderWrapper}>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".events-prev",
              nextEl: ".events-next",
            }}
            spaceBetween={30}
            slidesPerView={1}
            loop={upcomingEvents.length > 1}
            className={styles.swiper}
          >

            {upcomingEvents.map((event) => (

              <SwiperSlide key={event.id}>

                <article className={styles.card}>

                  {/* =========================
                      FLYER — LEFT
                  ========================= */}

                  <EventImage
                    src={event.image}
                    alt={event.title}
                    className={styles.imageWrapper}
                  />


                  {/* =========================
                      INFORMATION — RIGHT
                  ========================= */}

                  <div className={styles.eventInfo}>

                    <div className={styles.date}>

                      <span className={styles.month}>
                        {event.month}
                      </span>

                      <span className={styles.day}>
                        {event.date}
                      </span>

                    </div>


                    <h3>
                      {event.title}
                    </h3>


                    <p>
                      {event.description}
                    </p>


                    <div className={styles.details}>

                      <span>
                        <Clock size={17} />
                        {event.time}
                      </span>

                      <span>
                        <MapPin size={17} />
                        {event.location}
                      </span>

                    </div>

                  </div>

                </article>

              </SwiperSlide>

            ))}

          </Swiper>


          {/* =========================
              ARROWS
          ========================= */}

          <button
            className={`${styles.sliderButton} ${styles.prev} events-prev`}
            aria-label="Previous event"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            className={`${styles.sliderButton} ${styles.next} events-next`}
            aria-label="Next event"
          >
            <ChevronRight size={20} />
          </button>

        </div>


        {/* =========================
            CALENDAR BUTTON
        ========================= */}

        <div className={styles.buttonWrapper}>

          <Link
            to="/calendar"
            className={styles.button}
          >
            View School Calendar

            <ArrowRight size={18} />

          </Link>

        </div>

      </div>

    </section>
  );
}

export default UpcomingEvents;