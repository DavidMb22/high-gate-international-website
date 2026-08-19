import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "./AdminUpcomingEvents.module.css";


function AdminUpcomingEvents() {

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState(null);


  const loadEvents = async () => {

    const { data, error } =
      await supabase
        .from("upcoming_events")
        .select("*")
        .order("event_date", {
          ascending: true,
        });


    if (error) {

      console.error(
        "Error loading upcoming events:",
        error
      );

      setLoading(false);

      return;
    }


    setEvents(data || []);
    setLoading(false);
  };


  useEffect(() => {
    loadEvents();
  }, []);


  const handleDelete =
    async (event) => {

      const confirmed =
        window.confirm(
          `Are you sure you want to delete "${event.title}"?`
        );


      if (!confirmed) return;


      setDeletingId(event.id);


      try {

        if (event.flyer_image) {

          const marker =
            "/upcoming-event-images/";

          const markerIndex =
            event.flyer_image.indexOf(
              marker
            );


          if (markerIndex !== -1) {

            const filePath =
              decodeURIComponent(
                event.flyer_image.substring(
                  markerIndex +
                    marker.length
                )
              );


            const {
              error: storageError,
            } =
              await supabase.storage
                .from(
                  "upcoming-event-images"
                )
                .remove([
                  filePath,
                ]);


            if (storageError) {

              console.error(
                "Error deleting flyer:",
                storageError
              );

            }

          }
        }


        const { error } =
          await supabase
            .from("upcoming_events")
            .delete()
            .eq("id", event.id);


        if (error) {
          throw error;
        }


        setEvents(
          (current) =>
            current.filter(
              (item) =>
                item.id !== event.id
            )
        );

      } catch (error) {

        console.error(
          "Error deleting upcoming event:",
          error
        );


        alert(
          "Unable to delete the upcoming event."
        );

      } finally {

        setDeletingId(null);

      }
    };


  return (

    <main className={styles.page}>

      <header className={styles.header}>

        <div>

          <span className={styles.eyebrow}>
            CONTENT MANAGEMENT
          </span>

          <h1>
            Upcoming Events
          </h1>

          <p>
            Manage announcements and upcoming
            dates shown on the homepage.
          </p>

        </div>


        <Link
          to="/admin/upcoming-events/new"
          className={styles.addButton}
        >
          + Add Upcoming Event
        </Link>

      </header>


      <section className={styles.content}>

        {loading ? (

          <div className={styles.message}>
            Loading upcoming events...
          </div>

        ) : events.length === 0 ? (

          <div className={styles.emptyState}>

            <span>
              NO UPCOMING EVENTS
            </span>

            <h2>
              Add your first announcement
            </h2>

            <p>
              Upcoming events you publish
              here will appear on the homepage.
            </p>

            <Link
              to="/admin/upcoming-events/new"
              className={
                styles.primaryButton
              }
            >
              Add Upcoming Event
            </Link>

          </div>

        ) : (

          <div className={styles.eventList}>

            {events.map((event) => (

              <article
                key={event.id}
                className={styles.eventCard}
              >

                {event.flyer_image && (

                  <img
                    src={event.flyer_image}
                    alt=""
                    className={
                      styles.eventThumbnail
                    }
                  />

                )}


                <div
                  className={styles.eventInfo}
                >

                  <span
                    className={styles.status}
                  >
                    {event.status}
                  </span>


                  <h2>
                    {event.title}
                  </h2>


                  <p>
                    {event.description}
                  </p>


                  <div
                    className={styles.details}
                  >

                    <span>
                      {event.event_date}
                    </span>

                    {event.event_time && (

                      <span>
                        {event.event_time}
                      </span>

                    )}

                  </div>

                </div>


                <div
                  className={styles.actions}
                >

                  <Link
                    to={`/admin/upcoming-events/${event.id}/edit`}
                    className={
                      styles.editButton
                    }
                  >
                    Edit
                  </Link>


                  <button
                    className={
                      styles.deleteButton
                    }
                    onClick={() =>
                      handleDelete(event)
                    }
                    disabled={
                      deletingId === event.id
                    }
                  >
                    {deletingId === event.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}


export default AdminUpcomingEvents;