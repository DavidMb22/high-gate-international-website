import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "./AdminEvents.module.css";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", {
        ascending: false,
      });

    if (error) {
      console.error("Error loading events:", error);
      setLoading(false);
      return;
    }

    setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?`
    );

    if (!confirmed) return;

    setDeletingId(event.id);

    try {
      // Delete the cover image from Storage if one exists
      if (event.cover_image) {
        const marker = "/event-images/";

        const markerIndex =
          event.cover_image.indexOf(marker);

        if (markerIndex !== -1) {
          const filePath = decodeURIComponent(
            event.cover_image.substring(
              markerIndex + marker.length
            )
          );

          const { error: storageError } =
            await supabase.storage
              .from("event-images")
              .remove([filePath]);

          if (storageError) {
            console.error(
              "Error deleting image:",
              storageError
            );
          }
        }
      }

      // Delete the database record
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", event.id);

      if (error) {
        throw error;
      }

      setEvents((currentEvents) =>
        currentEvents.filter(
          (item) => item.id !== event.id
        )
      );
    } catch (error) {
      console.error(
        "Error deleting event:",
        error
      );

      alert(
        "Unable to delete the event. Please try again."
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
            School Events
          </h1>

          <p>
            Manage events displayed on the High Gate website.
          </p>
        </div>

        <Link
          to="/admin/events/new"
          className={styles.addButton}
        >
          + Add Event
        </Link>

      </header>

      <section className={styles.content}>

        {loading ? (

          <div className={styles.message}>
            Loading events...
          </div>

        ) : events.length === 0 ? (

          <div className={styles.emptyState}>

            <span>
              NO EVENTS YET
            </span>

            <h2>
              Add your first school event
            </h2>

            <p>
              Events you create here will appear on
              the public School Events page.
            </p>

            <Link
              to="/admin/events/new"
              className={styles.primaryButton}
            >
              Add Event
            </Link>

          </div>

        ) : (

          <div className={styles.eventList}>

            {events.map((event) => (

              <article
                key={event.id}
                className={styles.eventCard}
              >

                <div className={styles.eventInfo}>

                  {event.cover_image && (
                    <img
                      src={event.cover_image}
                      alt=""
                      className={styles.eventThumbnail}
                    />
                  )}

                  <div>
                    <span className={styles.year}>
                      {event.year}
                    </span>

                    <h2>
                      {event.title}
                    </h2>

                    <p>
                      {event.description}
                    </p>

                    <span className={styles.date}>
                      {event.event_date}
                    </span>
                  </div>

                </div>

                <div className={styles.actions}>

                  <Link
                    to={`/admin/events/${event.id}/edit`}
                    className={styles.editButton}
                  >
                    Edit
                  </Link>

                  <button
                    className={styles.deleteButton}
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

export default AdminEvents;