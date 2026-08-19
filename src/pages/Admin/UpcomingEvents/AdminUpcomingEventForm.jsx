import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "../Events/AdminEventForm.module.css";

function AdminUpcomingEventForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    status: "draft",
  });

  const [flyerImage, setFlyerImage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const handleChange = (event) => {

    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const handleImageChange = (event) => {

    const file =
      event.target.files?.[0];

    if (!file) return;


    if (!file.type.startsWith("image/")) {

      setError(
        "Please select a valid image file."
      );

      return;
    }


    if (file.size > 5 * 1024 * 1024) {

      setError(
        "The flyer must be smaller than 5 MB."
      );

      return;
    }


    setError("");
    setFlyerImage(file);
  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setLoading(true);


    try {

      let flyerUrl = null;


      /* =========================
         UPLOAD FLYER
      ========================= */

      if (flyerImage) {

        const extension =
          flyerImage.name
            .split(".")
            .pop();

        const fileName =
          `${crypto.randomUUID()}.${extension}`;

        const filePath =
          `flyers/${fileName}`;


        const { error: uploadError } =
          await supabase.storage
            .from(
              "upcoming-event-images"
            )
            .upload(
              filePath,
              flyerImage,
              {
                cacheControl: "3600",
                upsert: false,
              }
            );


        if (uploadError) {
          throw uploadError;
        }


        const { data } =
          supabase.storage
            .from(
              "upcoming-event-images"
            )
            .getPublicUrl(
              filePath
            );


        flyerUrl =
          data.publicUrl;
      }


      /* =========================
         CREATE RECORD
      ========================= */

      const { error: insertError } =
        await supabase
          .from("upcoming_events")
          .insert({

            title:
              formData.title,

            description:
              formData.description ||
              null,

            event_date:
              formData.eventDate,

            event_time:
              formData.eventTime ||
              null,

            flyer_image:
              flyerUrl,

            status:
              formData.status,
          });


      if (insertError) {
        throw insertError;
      }


      navigate(
        "/admin/upcoming-events"
      );

    } catch (error) {

      console.error(
        "Error creating upcoming event:",
        error
      );


      setError(
        error?.message ||
        "Unable to save the upcoming event."
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
            UPCOMING EVENTS
          </span>

          <h1>
            Add Upcoming Event
          </h1>

          <p>
            Create an announcement for an
            upcoming school event.
          </p>

        </div>

      </header>


      <section className={styles.content}>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >


          {/* TITLE */}

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
              placeholder="e.g. First Day of School"
              required
            />

          </div>


          {/* DESCRIPTION */}

          <div className={styles.field}>

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short announcement for parents..."
              rows={5}
            />

          </div>


          {/* FLYER */}

          <div className={styles.field}>

            <label htmlFor="flyerImage">
              Flyer
            </label>

            <input
              id="flyerImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={
                handleImageChange
              }
            />

            {flyerImage && (

              <small
                className={
                  styles.fileName
                }
              >
                Selected:{" "}
                {flyerImage.name}
              </small>

            )}

          </div>


          {/* DATE */}

          <div className={styles.field}>

            <label htmlFor="eventDate">
              Event Date
            </label>

            <input
              id="eventDate"
              name="eventDate"
              type="date"
              value={
                formData.eventDate
              }
              onChange={handleChange}
              required
            />

          </div>


          {/* TIME */}

          <div className={styles.field}>

            <label htmlFor="eventTime">
              Event Time
              <span>Optional</span>
            </label>

            <input
              id="eventTime"
              name="eventTime"
              type="text"
              value={
                formData.eventTime
              }
              onChange={handleChange}
              placeholder="e.g. 8:00 AM – 4:00 PM"
            />

          </div>


          {/* STATUS */}

          <div className={styles.field}>

            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={
                formData.status
              }
              onChange={handleChange}
            >

              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>

            </select>

          </div>


          {error && (

            <p
              className={styles.error}
            >
              {error}
            </p>

          )}


          {/* ACTIONS */}

          <div className={styles.actions}>

            <button
              type="button"
              className={
                styles.cancelButton
              }
              onClick={() =>
                navigate(
                  "/admin/upcoming-events"
                )
              }
              disabled={loading}
            >
              Cancel
            </button>


            <button
              type="submit"
              className={
                styles.submitButton
              }
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Upcoming Event"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}

export default AdminUpcomingEventForm;