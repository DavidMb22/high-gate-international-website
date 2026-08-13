import { useState } from "react";

import { ArrowUpRight } from "lucide-react";

import styles from "./SchoolEvents.module.css";

import { schoolLifeEvents } from "../data/schoolLife";

function SchoolEvents() {
  const academicYears = [
    "All",
    ...new Set(
      schoolLifeEvents.map(
        (event) => event.academicYear
      )
    ),
  ];

  const [selectedYear, setSelectedYear] =
    useState("All");

  const filteredEvents =
    selectedYear === "All"
      ? schoolLifeEvents
      : schoolLifeEvents.filter(
          (event) =>
            event.academicYear === selectedYear
        );

  return (
    <main className={styles.page}>

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className={styles.pageHeader}>

        <span className={styles.label}>
          School Life
        </span>

        <h1>
          Life at High Gate
        </h1>

        <p>
          Explore the events, celebrations and
          experiences that make our school community
          special.
        </p>

      </section>


      {/* =========================
          YEAR FILTER
      ========================= */}

      <section className={styles.content}>

        <div className={styles.filters}>

          {academicYears.map((year) => (

            <button
              key={year}
              className={
                selectedYear === year
                  ? styles.activeFilter
                  : styles.filter
              }
              onClick={() =>
                setSelectedYear(year)
              }
            >
              {year}
            </button>

          ))}

        </div>


        {/* =========================
            EVENTS
        ========================= */}

        <div className={styles.eventGrid}>

          {filteredEvents.map((event) => (

            <a
              key={event.id}
              href={event.photosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.eventCard}
            >

              <div className={styles.eventImage}>

                <img
                  src={event.image}
                  alt={event.title}
                />

                <span className={styles.icon}>
                  <ArrowUpRight size={19} />
                </span>

              </div>

              <div className={styles.eventContent}>

                <span className={styles.year}>
                  {event.academicYear}
                </span>

                <h2>
                  {event.title}
                </h2>

                <p>
                  {event.description}
                </p>

                <span className={styles.photos}>
                  View Photos
                  <ArrowUpRight size={16} />
                </span>

              </div>

            </a>

          ))}

        </div>


        {filteredEvents.length === 0 && (
          <div className={styles.empty}>
            <p>
              No events available for this academic year.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}

export default SchoolEvents;