import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "./AdminActivityForm.module.css";

function AdminActivityEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    activityDate: "",
    videoUrl: "",
    thumbnail: null,
  });

  const [existingThumbnail, setExistingThumbnail] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadActivity = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error loading activity:", error);
        setError("Unable to load this activity.");
        setLoading(false);
        return;
      }

      setFormData({
        title: data.title || "",
        description: data.description || "",
        activityDate: data.activity_date || "",
        videoUrl: data.video_url || "",
        thumbnail: null,
      });

      setExistingThumbnail(data.thumbnail || "");
      setLoading(false);
    };

    loadActivity();
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
    setSaving(true);

    try {
      let thumbnailUrl = existingThumbnail;

      // Upload replacement thumbnail
      if (formData.thumbnail) {
        const file = formData.thumbnail;

        const extension = file.name.split(".").pop();
        const fileName =
          `${crypto.randomUUID()}.${extension}`;

        const filePath = `activities/${fileName}`;

        const { error: uploadError } =
          await supabase.storage
            .from("activity-images")
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: false,
            });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } =
          supabase.storage
            .from("activity-images")
            .getPublicUrl(filePath);

        thumbnailUrl = publicUrlData.publicUrl;

        // Remove previous thumbnail
        if (existingThumbnail) {
          const marker = "/activity-images/";
          const markerIndex =
            existingThumbnail.indexOf(marker);

          if (markerIndex !== -1) {
            const oldPath = decodeURIComponent(
              existingThumbnail.substring(
                markerIndex + marker.length
              )
            );

            const { error: removeError } =
              await supabase.storage
                .from("activity-images")
                .remove([oldPath]);

            if (removeError) {
              console.error(
                "Error removing old thumbnail:",
                removeError
              );
            }
          }
        }
      }

      const year = formData.activityDate
        ? new Date(formData.activityDate).getFullYear()
        : null;

      const { error: updateError } =
        await supabase
          .from("activities")
          .update({
            title: formData.title,
            description: formData.description,
            activity_date:
              formData.activityDate || null,
            year,
            video_url: formData.videoUrl,
            thumbnail: thumbnailUrl || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);

      if (updateError) {
        throw updateError;
      }

      navigate("/admin/activities");
    } catch (error) {
      console.error("Error updating activity:", error);

      setError(
        error?.message ||
          "Unable to update the activity."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.page}>
        <section className={styles.content}>
          <p>Loading activity...</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>
            SCHOOL ACTIVITIES
          </span>

          <h1>Edit Activity</h1>

          <p>
            Update the activity displayed on the
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
              Current Thumbnail
            </label>

            {existingThumbnail ? (
              <img
                src={existingThumbnail}
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
                No thumbnail uploaded.
              </small>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="thumbnail">
              Replace Thumbnail
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
                Selected: {formData.thumbnail.name}
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

export default AdminActivityEdit;