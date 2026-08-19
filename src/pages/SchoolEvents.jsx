import { useEffect, useState } from "react";

import { ArrowUpRight } from "lucide-react";

import styles from "./SchoolEvents.module.css";

import schoolLifeImage from "../assets/images/about/about-main.JPG";

import { supabase } from "../lib/supabase";

function SchoolEvents() {
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", {
          ascending: false,
        });

      if (error) {
        console.error("Error loading events:", error);

        setError(
          "Unable to load school events."
        );

        setLoading(false);

        return;
      }

      setEvents(data || []);
      setLoading(false);
    };

    loadEvents();
  }, []);

  const academicYears = [
    "All",
    ...new Set(
      events.map((event) => String(event.year))
    ),
  ];

  const filteredEvents =
    selectedYear === "All"
      ? events
      : events.filter(
        (event) =>
          String(event.year) === selectedYear
      );

  return (
    <main className={styles.page}>

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section
        className={styles.pageHeader}
        style={{
          backgroundImage: `url(${schoolLifeImage})`,
        }}
      >

        <div className={styles.headerOverlay} />

        <div className={styles.headerContent}>

          <span className={styles.label}>
            SCHOOL LIFE
          </span>

          <h1>
            Life at High Gate
          </h1>

          <p>
            Explore the events, celebrations and
            experiences that make our school community
            special.
          </p>

        </div>

      </section>


      {/* =========================
          YEAR FILTER
      ========================= */}

      <section className={styles.content}>

        {!loading && events.length > 0 && (
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
        )}


        {/* =========================
            LOADING
        ========================= */}

        {loading && (
          <div className={styles.empty}>
            <p>
              Loading school events...
            </p>
          </div>
        )}


        {/* =========================
            ERROR
        ========================= */}

        {!loading && error && (
          <div className={styles.empty}>
            <p>
              {error}
            </p>
          </div>
        )}


        {/* =========================
            EVENTS
        ========================= */}

        {!loading && !error && (
          <div className={styles.eventGrid}>

            {filteredEvents.map((event) => (

              <a
                key={event.id}
                href={event.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.eventCard}
              >

                <div className={styles.eventImage}>

                  {event.cover_image ? (
                    <img
                      src={event.cover_image}
                      alt={event.title}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span>
                        {event.title}
                      </span>
                    </div>
                  )}

                  <span className={styles.icon}>
                    <ArrowUpRight size={19} />
                  </span>

                </div>


                <div className={styles.eventContent}>

                  <span className={styles.year}>
                    {event.year}
                  </span>

                  <h2>
                    {event.title}
                  </h2>

                  <p>
                    {event.description}
                  </p>

                  {event.link && (
                    <span className={styles.photos}>
                      View Event
                      <ArrowUpRight size={16} />
                    </span>
                  )}

                </div>

              </a>

            ))}

          </div>
        )}


        {!loading &&
          !error &&
          filteredEvents.length === 0 && (
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