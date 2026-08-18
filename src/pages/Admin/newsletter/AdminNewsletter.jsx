import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "./AdminNewsletter.module.css";

function AdminNewsletter() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadNewsletters = async () => {
    const { data, error } = await supabase
      .from("newsletters")
      .select("*")
      .order("academic_year", {
        ascending: false,
      })
      .order("term", {
        ascending: true,
      });

    if (error) {
      console.error(
        "Error loading newsletters:",
        error
      );

      setLoading(false);
      return;
    }

    setNewsletters(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadNewsletters();
  }, []);

  const handleDelete = async (newsletter) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${newsletter.title}"?`
    );

    if (!confirmed) return;

    setDeletingId(newsletter.id);

    try {
      // Delete cover image if one exists
      if (newsletter.cover_image) {
        const marker = "/newsletter-images/";

        const markerIndex =
          newsletter.cover_image.indexOf(marker);

        if (markerIndex !== -1) {
          const filePath = decodeURIComponent(
            newsletter.cover_image.substring(
              markerIndex + marker.length
            )
          );

          const { error: storageError } =
            await supabase.storage
              .from("newsletter-images")
              .remove([filePath]);

          if (storageError) {
            console.error(
              "Error deleting cover image:",
              storageError
            );
          }
        }
      }

      const { error } = await supabase
        .from("newsletters")
        .delete()
        .eq("id", newsletter.id);

      if (error) {
        throw error;
      }

      setNewsletters((current) =>
        current.filter(
          (item) => item.id !== newsletter.id
        )
      );
    } catch (error) {
      console.error(
        "Error deleting newsletter:",
        error
      );

      alert(
        "Unable to delete the newsletter. Please try again."
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
            Newsletter
          </h1>

          <p>
            Manage school newsletters published on
            the High Gate website.
          </p>
        </div>

        <Link
          to="/admin/newsletter/new"
          className={styles.addButton}
        >
          + Add Newsletter
        </Link>

      </header>


      <section className={styles.content}>

        {loading ? (

          <div className={styles.message}>
            Loading newsletters...
          </div>

        ) : newsletters.length === 0 ? (

          <div className={styles.emptyState}>

            <span>
              NEWSLETTER
            </span>

            <h2>
              No newsletters yet
            </h2>

            <p>
              Add your first school newsletter to
              begin building the archive.
            </p>

            <Link
              to="/admin/newsletter/new"
              className={styles.primaryButton}
            >
              Add Newsletter
            </Link>

          </div>

        ) : (

          <div className={styles.newsletterList}>

            {newsletters.map((newsletter) => (

              <article
                key={newsletter.id}
                className={styles.newsletterCard}
              >

                <div className={styles.newsletterInfo}>

                  {newsletter.cover_image && (
                    <img
                      src={newsletter.cover_image}
                      alt=""
                      className={styles.thumbnail}
                    />
                  )}

                  <div>

                    <span className={styles.term}>
                      {newsletter.academic_year}
                      {" · "}
                      {newsletter.term}
                    </span>

                    <h2>
                      {newsletter.title}
                    </h2>

                    {newsletter.excerpt && (
                      <p>
                        {newsletter.excerpt}
                      </p>
                    )}

                    <span
                      className={
                        newsletter.status ===
                        "published"
                          ? styles.published
                          : styles.draft
                      }
                    >
                      {newsletter.status}
                    </span>

                  </div>

                </div>


                <div className={styles.actions}>

                  <Link
                    to={`/newsletter/${newsletter.slug}`}
                    target="_blank"
                    className={styles.viewButton}
                  >
                    View
                  </Link>

                  <Link
                    to={`/admin/newsletter/${newsletter.id}/edit`}
                    className={styles.editButton}
                  >
                    Edit
                  </Link>

                  <button
                    className={styles.deleteButton}
                    onClick={() =>
                      handleDelete(newsletter)
                    }
                    disabled={
                      deletingId === newsletter.id
                    }
                  >
                    {deletingId === newsletter.id
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

export default AdminNewsletter;