import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [eventCount, setEventCount] = useState(0);
  const [activityCount, setActivityCount] = useState(0);

  const [recentEvents, setRecentEvents] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      const [
        eventsResult,
        activitiesResult,
        recentEventsResult,
        recentActivitiesResult,
      ] = await Promise.all([
        supabase
          .from("events")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("activities")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("events")
          .select("id, title, year, event_date")
          .order("event_date", {
            ascending: false,
          })
          .limit(5),

        supabase
          .from("activities")
          .select(
            "id, title, year, activity_date"
          )
          .order("activity_date", {
            ascending: false,
          })
          .limit(5),
      ]);

      if (eventsResult.error) {
        console.error(
          "Error loading event count:",
          eventsResult.error
        );
      }

      if (activitiesResult.error) {
        console.error(
          "Error loading activity count:",
          activitiesResult.error
        );
      }

      if (recentEventsResult.error) {
        console.error(
          "Error loading recent events:",
          recentEventsResult.error
        );
      }

      if (recentActivitiesResult.error) {
        console.error(
          "Error loading recent activities:",
          recentActivitiesResult.error
        );
      }

      setEventCount(eventsResult.count || 0);
      setActivityCount(
        activitiesResult.count || 0
      );

      setRecentEvents(
        recentEventsResult.data || []
      );

      setRecentActivities(
        recentActivitiesResult.data || []
      );

      setLoading(false);
    };

    loadDashboard();
  }, []);

  return (
    <main className={styles.page}>

      {/* =========================
          HEADER
      ========================= */}

      <header className={styles.header}>

        <div>
          <span className={styles.eyebrow}>
            HIGH GATE INTERNATIONAL ACADEMY
          </span>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage the content displayed on the
            school website.
          </p>
        </div>

        <button
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      {/* =========================
          CONTENT
      ========================= */}

      <section className={styles.content}>

        <div className={styles.sectionHeader}>

          <span className={styles.eyebrow}>
            CONTENT MANAGEMENT
          </span>

          <h2>
            Website Overview
          </h2>

          <p>
            Manage and monitor the content published
            across the High Gate website.
          </p>

        </div>


        {/* =========================
            STAT CARDS
        ========================= */}

        <div className={styles.statsGrid}>

          <button
            className={styles.statCard}
            onClick={() =>
              navigate("/admin/events")
            }
          >

            <span className={styles.number}>
              01
            </span>

            <span className={styles.statLabel}>
              SCHOOL EVENTS
            </span>

            <strong className={styles.statNumber}>
              {loading ? "—" : eventCount}
            </strong>

            <span className={styles.cardLink}>
              Manage Events →
            </span>

          </button>


          <button
            className={styles.statCard}
            onClick={() =>
              navigate("/admin/activities")
            }
          >

            <span className={styles.number}>
              02
            </span>

            <span className={styles.statLabel}>
              SCHOOL ACTIVITIES
            </span>

            <strong className={styles.statNumber}>
              {loading ? "—" : activityCount}
            </strong>

            <span className={styles.cardLink}>
              Manage Activities →
            </span>

          </button>

        </div>


        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>
            QUICK ACTIONS
          </span>

          <h2>
            Add New Content
          </h2>
        </div>


        <div className={styles.quickActions}>

          <button
            className={styles.primaryAction}
            onClick={() =>
              navigate("/admin/events/new")
            }
          >
            + Add School Event
          </button>

          <button
            className={styles.secondaryAction}
            onClick={() =>
              navigate("/admin/activities/new")
            }
          >
            + Add School Activity
          </button>

        </div>


        {/* =========================
            RECENT CONTENT
        ========================= */}

        <div className={styles.recentGrid}>

          {/* RECENT EVENTS */}

          <div className={styles.recentSection}>

            <div className={styles.recentHeader}>

              <div>
                <span className={styles.eyebrow}>
                  SCHOOL EVENTS
                </span>

                <h2>
                  Recent Events
                </h2>
              </div>

              <button
                onClick={() =>
                  navigate("/admin/events")
                }
                className={styles.viewAll}
              >
                View All →
              </button>

            </div>


            {recentEvents.length > 0 ? (

              <div className={styles.recentList}>

                {recentEvents.map((event) => (

                  <div
                    key={event.id}
                    className={styles.recentItem}
                  >

                    <div>
                      <h3>
                        {event.title}
                      </h3>

                      <span>
                        {event.year}
                      </span>
                    </div>

                    <span className={styles.arrow}>
                      →
                    </span>

                  </div>

                ))}

              </div>

            ) : (

              <div className={styles.noContent}>
                No events have been added yet.
              </div>

            )}

          </div>


          {/* RECENT ACTIVITIES */}

          <div className={styles.recentSection}>

            <div className={styles.recentHeader}>

              <div>
                <span className={styles.eyebrow}>
                  SCHOOL ACTIVITIES
                </span>

                <h2>
                  Recent Activities
                </h2>
              </div>

              <button
                onClick={() =>
                  navigate("/admin/activities")
                }
                className={styles.viewAll}
              >
                View All →
              </button>

            </div>


            {recentActivities.length > 0 ? (

              <div className={styles.recentList}>

                {recentActivities.map(
                  (activity) => (

                    <div
                      key={activity.id}
                      className={styles.recentItem}
                    >

                      <div>
                        <h3>
                          {activity.title}
                        </h3>

                        <span>
                          {activity.year}
                        </span>
                      </div>

                      <span
                        className={styles.arrow}
                      >
                        →
                      </span>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className={styles.noContent}>
                No activities have been added yet.
              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default AdminDashboard;