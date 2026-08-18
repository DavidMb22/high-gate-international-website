import { useEffect, useState } from "react";

import styles from "./SchoolActivities.module.css";

import { supabase } from "../lib/supabase";

function SchoolActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadActivities = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("activity_date", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Error loading activities:",
          error
        );

        setError(
          "Unable to load school activities."
        );

        setLoading(false);
        return;
      }

      setActivities(data || []);
      setLoading(false);
    };

    loadActivities();
  }, []);

  return (
    <main className={styles.page}>

      {/* HEADER */}

      <section className={styles.header}>
        <span>School Activities</span>

        <h1>
          Life at High Gate
        </h1>

        <p>
          Discover what happens beyond the classroom
          through our school activities and videos.
        </p>
      </section>


      {/* ACTIVITIES */}

      <section className={styles.activities}>
        <div className={styles.container}>

          {loading ? (

            <div className={styles.emptyState}>
              <span>
                SCHOOL ACTIVITIES
              </span>

              <h2>
                Loading Activities...
              </h2>

              <p>
                Please wait while we load the latest
                activities from High Gate.
              </p>
            </div>

          ) : error ? (

            <div className={styles.emptyState}>
              <span>
                SCHOOL ACTIVITIES
              </span>

              <h2>
                Unable to Load Activities
              </h2>

              <p>
                {error}
              </p>
            </div>

          ) : activities.length > 0 ? (

            <div className={styles.activityGrid}>

              {activities.map((activity) => (

                <article
                  key={activity.id}
                  className={styles.activityCard}
                >

                  {activity.thumbnail ? (
                    <div className={styles.imageWrapper}>

                      <img
                        src={activity.thumbnail}
                        alt={activity.title}
                      />

                    </div>
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      {activity.title}
                    </div>
                  )}


                  <div className={styles.activityContent}>

                    {activity.year && (
                      <span className={styles.year}>
                        {activity.year}
                      </span>
                    )}

                    <h2>
                      {activity.title}
                    </h2>

                    <p>
                      {activity.description}
                    </p>

                    {activity.video_url && (
                      <a
                        href={activity.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.activityLink}
                      >
                        Watch Activity →
                      </a>
                    )}

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className={styles.emptyState}>

              <span>
                SCHOOL ACTIVITIES
              </span>

              <h2>
                Discover Life Beyond
                the Classroom
              </h2>

              <p>
                Our school activities will be shared here.
                Check back soon to discover the experiences,
                activities and moments that make life at
                High Gate special.
              </p>

            </div>

          )}

        </div>
      </section>

    </main>
  );
}

export default SchoolActivities;