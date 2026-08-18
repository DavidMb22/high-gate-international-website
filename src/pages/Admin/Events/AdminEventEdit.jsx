import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "./AdminEventForm.module.css";

function AdminEventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    link: "",
    coverImage: null,
  });

  const [existingImage, setExistingImage] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(
          "Error loading event:",
          error
        );

        setError(
          "Unable to load this event."
        );

        setLoading(false);
        return;
      }

      setFormData({
        title: data.title || "",
        description: data.description || "",
        eventDate: data.event_date || "",
        link: data.link || "",
        coverImage: null,
      });

      setExistingImage(
        data.cover_image || ""
      );

      setLoading(false);
    };

    loadEvent();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "The image must be smaller than 5 MB."
      );
      return;
    }

    setError("");

    setFormData((previous) => ({
      ...previous,
      coverImage: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      let coverImageUrl = existingImage;

      // Upload a new image if selected
      if (formData.coverImage) {
        const file = formData.coverImage;

        const extension =
          file.name.split(".").pop();

        const fileName =
          `${crypto.randomUUID()}.${extension}`;

        const filePath =
          `events/${fileName}`;

        const { error: uploadError } =
          await supabase.storage
            .from("event-images")
            .upload(
              filePath,
              file,
              {
                cacheControl: "3600",
                upsert: false,
              }
            );

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: publicUrlData,
        } = supabase.storage
          .from("event-images")
          .getPublicUrl(filePath);

        coverImageUrl =
          publicUrlData.publicUrl;

        // Remove old image
        if (existingImage) {
          const marker = "/event-images/";

          const markerIndex =
            existingImage.indexOf(marker);

          if (markerIndex !== -1) {
            const oldPath =
              decodeURIComponent(
                existingImage.substring(
                  markerIndex + marker.length
                )
              );

            await supabase.storage
              .from("event-images")
              .remove([oldPath]);
          }
        }
      }

      const year = new Date(
        formData.eventDate
      ).getFullYear();

      const { error: updateError } =
        await supabase
          .from("events")
          .update({
            title: formData.title,
            description:
              formData.description,
            event_date:
              formData.eventDate,
            year,
            link:
              formData.link || null,
            cover_image:
              coverImageUrl || null,
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", id);

      if (updateError) {
        throw updateError;
      }

      navigate("/admin/events");

    } catch (error) {
      console.error(
        "Error updating event:",
        error
      );

      setError(
        error?.message ||
        "Unable to update the event."
      );

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.page}>
        <section className={styles.content}>
          <p>Loading event...</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>

      <header className={styles.header}>

        <div>
          <span className={styles.eyebrow}>
            SCHOOL EVENTS
          </span>

          <h1>
            Edit Event
          </h1>

          <p>
            Update the event information displayed
            on the High Gate website.
          </p>
        </div>

      </header>

      <section className={styles.content}>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >

          <div className={styles.field}>
            <label htmlFor="title">
              Event Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
            />
          </div>

          <div className={styles.field}>
            <label>
              Current Cover Image
            </label>

            {existingImage ? (
              <img
                src={existingImage}
                alt=""
                style={{
                  width: "220px",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            ) : (
              <small>
                No cover image.
              </small>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="coverImage">
              Replace Cover Image
              <span>Optional</span>
            </label>

            <input
              id="coverImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />

            {formData.coverImage && (
              <small>
                Selected:{" "}
                {formData.coverImage.name}
              </small>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="eventDate">
              Event Date
            </label>

            <input
              id="eventDate"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="link">
              Event / Video Link
              <span>Optional</span>
            </label>

            <input
              id="link"
              name="link"
              type="url"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          <div className={styles.actions}>

            <button
              type="button"
              className={styles.cancelButton}
              onClick={() =>
                navigate("/admin/events")
              }
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}

export default AdminEventEdit;