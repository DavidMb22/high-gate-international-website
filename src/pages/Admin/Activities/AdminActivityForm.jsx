import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "./AdminActivityForm.module.css";

function AdminActivityForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    activityDate: "",
    videoUrl: "",
    thumbnail: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("The image must be smaller than 5 MB.");
      return;
    }

    setError("");

    setFormData((previous) => ({
      ...previous,
      thumbnail: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      let thumbnailUrl = null;

      // Upload thumbnail
      if (formData.thumbnail) {
        const file = formData.thumbnail;

        const extension =
          file.name.split(".").pop();

        const fileName =
          `${crypto.randomUUID()}.${extension}`;

        const filePath =
          `activities/${fileName}`;

        const { error: uploadError } =
          await supabase.storage
            .from("activity-images")
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
          .from("activity-images")
          .getPublicUrl(filePath);

        thumbnailUrl =
          publicUrlData.publicUrl;
      }

      const year = formData.activityDate
        ? new Date(
            formData.activityDate
          ).getFullYear()
        : null;

      const { error: insertError } =
        await supabase
          .from("activities")
          .insert({
            title: formData.title,
            description:
              formData.description,
            activity_date:
              formData.activityDate || null,
            year,
            video_url:
              formData.videoUrl,
            thumbnail:
              thumbnailUrl,
          });

      if (insertError) {
        throw insertError;
      }

      navigate("/admin/activities");

    } catch (error) {
      console.error(
        "Error creating activity:",
        error
      );

      setError(
        error?.message ||
        "Unable to save the activity."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>

      <header className={styles.header}>

        <div>
          <span className={styles.eyebrow}>
            SCHOOL ACTIVITIES
          </span>

          <h1>
            Add Activity
          </h1>

          <p>
            Add an activity and its video to the
            High Gate website.
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
              Activity Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Coding & Robotics"
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
              placeholder="Write a short description..."
              rows={6}
              required
            />
          </div>


          <div className={styles.field}>
            <label htmlFor="thumbnail">
              Cover / Thumbnail
              <span>Optional</span>
            </label>

            <input
              id="thumbnail"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />

            {formData.thumbnail && (
              <small>
                Selected:{" "}
                {formData.thumbnail.name}
              </small>
            )}
          </div>


          <div className={styles.field}>
            <label htmlFor="activityDate">
              Activity Date
              <span>Optional</span>
            </label>

            <input
              id="activityDate"
              name="activityDate"
              type="date"
              value={formData.activityDate}
              onChange={handleChange}
            />
          </div>


          <div className={styles.field}>
            <label htmlFor="videoUrl">
              Video Link
            </label>

            <input
              id="videoUrl"
              name="videoUrl"
              type="url"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
              required
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
                navigate("/admin/activities")
              }
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Activity"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}

export default AdminActivityForm;