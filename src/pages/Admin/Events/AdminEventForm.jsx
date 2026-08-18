import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "./AdminEventForm.module.css";

function AdminEventForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        eventDate: "",
        link: "",
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
            coverImage: file,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            let coverImageUrl = null;

            // Upload cover image if one was selected
            if (formData.coverImage) {
                const file = formData.coverImage;

                const fileExtension =
                    file.name.split(".").pop();

                const fileName = `${crypto.randomUUID()}.${fileExtension}`;

                const filePath = `events/${fileName}`;

                const { error: uploadError } =
                    await supabase.storage
                        .from("event-images")
                        .upload(filePath, file, {
                            cacheControl: "3600",
                            upsert: false,
                        });

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
            }

            const year = new Date(
                formData.eventDate
            ).getFullYear();

            const { error: insertError } =
                await supabase
                    .from("events")
                    .insert({
                        title: formData.title,
                        description: formData.description,
                        event_date: formData.eventDate,
                        year,
                        link: formData.link || null,
                        cover_image: coverImageUrl,
                    });

            if (insertError) {
                throw insertError;
            }

            navigate("/admin/events");

        } catch (error) {
            console.error(
                "Error creating event:",
                error
            );

            setError(
                error?.message ||
                "Unable to save the event. Please check the image and try again."
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
                        SCHOOL EVENTS
                    </span>

                    <h1>
                        Add Event
                    </h1>

                    <p>
                        Create a new event for the High Gate website.
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
                            placeholder="e.g. Annual Sports Day"
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
                            placeholder="Write a short description of the event..."
                            rows={6}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="coverImage">
                            Cover Image
                        </label>

                        <input
                            id="coverImage"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleImageChange}
                        />

                        {formData.coverImage && (
                            <small className={styles.fileName}>
                                Selected: {formData.coverImage.name}
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
                                : "Save Event"}
                        </button>

                    </div>

                </form>

            </section>

        </main>
    );
}

export default AdminEventForm;