import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "../Events/AdminEventForm.module.css";

function AdminUpcomingEventEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    status: "draft",
  });

  const [existingFlyer, setExistingFlyer] =
    useState("");

  const [newFlyer, setNewFlyer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");


  /* ==================================================
     LOAD EVENT
  ================================================== */

  useEffect(() => {

    const loadEvent = async () => {

      const { data, error } =
        await supabase
          .from("upcoming_events")
          .select("*")
          .eq("id", id)
          .single();


      if (error) {

        console.error(
          "Error loading upcoming event:",
          error
        );

        setError(
          "Unable to load this upcoming event."
        );

        setLoading(false);

        return;
      }


      setFormData({
        title: data.title || "",
        description:
          data.description || "",
        eventDate:
          data.event_date || "",
        eventTime:
          data.event_time || "",
        status:
          data.status || "draft",
      });


      setExistingFlyer(
        data.flyer_image || ""
      );


      setLoading(false);
    };


    loadEvent();

  }, [id]);


  /* ==================================================
     HANDLE INPUT
  ================================================== */

  const handleChange = (event) => {

    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* ==================================================
     HANDLE FLYER
  ================================================== */

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
    setNewFlyer(file);
  };


  /* ==================================================
     STORAGE PATH
  ================================================== */

  const getStoragePath = (publicUrl) => {

    if (!publicUrl) {
      return null;
    }


    const marker =
      "/upcoming-event-images/";

    const index =
      publicUrl.indexOf(marker);


    if (index === -1) {
      return null;
    }


    return decodeURIComponent(
      publicUrl.substring(
        index + marker.length
      )
    );
  };


  /* ==================================================
     SAVE
  ================================================== */

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setSaving(true);


    try {

      let flyerUrl =
        existingFlyer;


      /* =========================
         REPLACE FLYER
      ========================= */

      if (newFlyer) {

        const extension =
          newFlyer.name
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
              newFlyer,
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


        /* =========================
           REMOVE OLD FLYER
        ========================= */

        const oldPath =
          getStoragePath(
            existingFlyer
          );


        if (oldPath) {

          const {
            error: removeError,
          } =
            await supabase.storage
              .from(
                "upcoming-event-images"
              )
              .remove([
                oldPath,
              ]);


          if (removeError) {

            console.error(
              "Error removing old flyer:",
              removeError
            );

          }

        }

      }


      /* =========================
         UPDATE DATABASE
      ========================= */

      const { error: updateError } =
        await supabase
          .from("upcoming_events")
          .update({

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
              flyerUrl || null,

            status:
              formData.status,

            updated_at:
              new Date().toISOString(),

          })
          .eq("id", id);


      if (updateError) {
        throw updateError;
      }


      navigate(
        "/admin/upcoming-events"
      );

    } catch (error) {

      console.error(
        "Error updating upcoming event:",
        error
      );


      setError(
        error?.message ||
        "Unable to update the upcoming event."
      );

    } finally {

      setSaving(false);

    }
  };


  /* ==================================================
     LOADING
  ================================================== */

  if (loading) {

    return (

      <main className={styles.page}>

        <section className={styles.content}>

          <p>
            Loading upcoming event...
          </p>

        </section>

      </main>

    );
  }


  return (

    <main className={styles.page}>

      <header className={styles.header}>

        <div>

          <span className={styles.eyebrow}>
            UPCOMING EVENTS
          </span>

          <h1>
            Edit Upcoming Event
          </h1>

          <p>
            Update this upcoming event
            announcement.
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
              rows={5}
              value={
                formData.description
              }
              onChange={handleChange}
            />

          </div>


          {/* CURRENT FLYER */}

          {existingFlyer && (

            <div className={styles.field}>

              <label>
                Current Flyer
              </label>

              <div
                style={{
                  maxWidth: "500px",
                  height: "280px",
                  overflow: "hidden",
                  borderRadius: "8px",
                  border:
                    "1px solid #e0e3e3",
                  background:
                    "#f5f2ec",
                }}
              >

                <img
                  src={existingFlyer}
                  alt={
                    formData.title
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

              </div>

            </div>

          )}


          {/* REPLACE FLYER */}

          <div className={styles.field}>

            <label htmlFor="flyerImage">
              Replace Flyer
            </label>

            <input
              id="flyerImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={
                handleImageChange
              }
            />

            {newFlyer && (

              <small
                className={
                  styles.fileName
                }
              >
                Selected:{" "}
                {newFlyer.name}
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

            <p className={styles.error}>
              {error}
            </p>

          )}


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
              disabled={saving}
            >
              Cancel
            </button>


            <button
              type="submit"
              className={
                styles.submitButton
              }
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


export default AdminUpcomingEventEdit;