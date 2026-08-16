import styles from "./SchoolActivities.module.css";
import { schoolActivities } from "../data/schoolActivities";

function SchoolActivities() {
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

          {schoolActivities.length > 0 ? (

            <div className={styles.activityGrid}>

              {schoolActivities.map((activity) => (

                <article
                  key={activity.id}
                  className={styles.activityCard}
                >

                  {activity.image && (
                    <div className={styles.imageWrapper}>
                      <img
                        src={activity.image}
                        alt={activity.title}
                      />
                    </div>
                  )}

                  <div className={styles.activityContent}>

                    <span className={styles.year}>
                      {activity.year}
                    </span>

                    <h2>
                      {activity.title}
                    </h2>

                    <p>
                      {activity.description}
                    </p>

                    {activity.link && (
                      <a
                        href={activity.link}
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