import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "./AdminNewsletterForm.module.css";

import NewsletterEditor from "../../../components/NewsletterEditor/NewsletterEditor";

function AdminNewsletterEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        academicYear: "",
        term: "Term 1",
        title: "",
        publicationDate: "",
        excerpt: "",
        content: "",
        status: "draft",
    });

    const [existingCover, setExistingCover] = useState("");
    const [newCover, setNewCover] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadNewsletter = async () => {
            const { data, error } = await supabase
                .from("newsletters")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error(
                    "Error loading newsletter:",
                    error
                );

                setError(
                    "Unable to load this newsletter."
                );

                setLoading(false);
                return;
            }

            setFormData({
                academicYear: data.academic_year || "",
                term: data.term || "Term 1",
                title: data.title || "",
                publicationDate:
                    data.publication_date || "",
                excerpt: data.excerpt || "",
                content: data.content || "",
                status: data.status || "draft",
            });

            setExistingCover(data.cover_image || "");
            setLoading(false);
        };

        loadNewsletter();
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
            setError(
                "The cover image must be smaller than 5 MB."
            );
            return;
        }

        setError("");
        setNewCover(file);
    };

    const getStoragePath = (publicUrl) => {
        if (!publicUrl) return null;

        const marker = "/newsletter-images/";

        const index = publicUrl.indexOf(marker);

        if (index === -1) return null;

        return decodeURIComponent(
            publicUrl.substring(index + marker.length)
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSaving(true);

        try {
            let coverImageUrl = existingCover;

            /*
             * Upload replacement cover
             */

            if (newCover) {
                const extension =
                    newCover.name.split(".").pop();

                const fileName =
                    `${crypto.randomUUID()}.${extension}`;

                const filePath =
                    `covers/${fileName}`;

                const { error: uploadError } =
                    await supabase.storage
                        .from("newsletter-images")
                        .upload(filePath, newCover, {
                            cacheControl: "3600",
                            upsert: false,
                        });

                if (uploadError) {
                    throw uploadError;
                }

                const { data } =
                    supabase.storage
                        .from("newsletter-images")
                        .getPublicUrl(filePath);

                coverImageUrl = data.publicUrl;

                /*
                 * Remove old cover
                 */

                const oldPath =
                    getStoragePath(existingCover);

                if (oldPath) {
                    const { error: removeError } =
                        await supabase.storage
                            .from("newsletter-images")
                            .remove([oldPath]);

                    if (removeError) {
                        console.error(
                            "Error removing old cover:",
                            removeError
                        );
                    }
                }
            }

            /*
             * Update newsletter
             */

            const { error: updateError } =
                await supabase
                    .from("newsletters")
                    .update({
                        academic_year:
                            formData.academicYear,

                        term: formData.term,

                        title: formData.title,

                        publication_date:
                            formData.publicationDate || null,

                        excerpt:
                            formData.excerpt || null,

                        content:
                            formData.content || null,

                        cover_image:
                            coverImageUrl || null,

                        status: formData.status,

                        updated_at:
                            new Date().toISOString(),
                    })
                    .eq("id", id);

            if (updateError) {
                throw updateError;
            }

            navigate("/admin/newsletter");

        } catch (error) {
            console.error(
                "Error updating newsletter:",
                error
            );

            setError(
                error?.message ||
                "Unable to update the newsletter."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className={styles.page}>
                <section className={styles.content}>
                    <p>Loading newsletter...</p>
                </section>
            </main>
        );
    }

    return (
        <main className={styles.page}>

            <header className={styles.header}>

                <div>
                    <span className={styles.eyebrow}>
                        NEWSLETTER
                    </span>

                    <h1>
                        Edit Newsletter
                    </h1>

                    <p>
                        Update this school newsletter.
                    </p>
                </div>

            </header>


            <section className={styles.content}>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >

                    {/* =========================
              INFORMATION
          ========================= */}

                    <div className={styles.section}>

                        <div className={styles.sectionHeader}>

                            <span>
                                01
                            </span>

                            <div>
                                <h2>
                                    Newsletter Information
                                </h2>

                                <p>
                                    Update the basic information.
                                </p>
                            </div>

                        </div>


                        <div className={styles.grid}>

                            <div className={styles.field}>

                                <label htmlFor="academicYear">
                                    Academic Year
                                </label>

                                <input
                                    id="academicYear"
                                    name="academicYear"
                                    type="text"
                                    value={formData.academicYear}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className={styles.field}>

                                <label htmlFor="term">
                                    Term
                                </label>

                                <select
                                    id="term"
                                    name="term"
                                    value={formData.term}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="Term 1">
                                        Term 1
                                    </option>

                                    <option value="Term 2">
                                        Term 2
                                    </option>

                                    <option value="Term 3">
                                        Term 3
                                    </option>

                                </select>

                            </div>

                        </div>


                        <div className={styles.field}>

                            <label htmlFor="title">
                                Newsletter Title
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


                        <div className={styles.grid}>

                            <div className={styles.field}>

                                <label htmlFor="publicationDate">
                                    Publication Date
                                </label>

                                <input
                                    id="publicationDate"
                                    name="publicationDate"
                                    type="date"
                                    value={
                                        formData.publicationDate
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className={styles.field}>

                                <label htmlFor="status">
                                    Status
                                </label>

                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
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

                        </div>

                    </div>


                    {/* =========================
              COVER
          ========================= */}

                    <div className={styles.section}>

                        <div className={styles.sectionHeader}>

                            <span>
                                02
                            </span>

                            <div>
                                <h2>
                                    Cover Image
                                </h2>

                                <p>
                                    Replace the current cover if
                                    necessary.
                                </p>
                            </div>

                        </div>


                        {existingCover && (
                            <div className={styles.currentCover}>

                                <img
                                    src={existingCover}
                                    alt={formData.title}
                                />

                            </div>
                        )}


                        <div className={styles.field}>

                            <label htmlFor="coverImage">
                                Replace Cover Image
                            </label>

                            <input
                                id="coverImage"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageChange}
                            />

                            {newCover && (
                                <div className={styles.fileInfo}>
                                    Selected: {newCover.name}
                                </div>
                            )}

                        </div>

                    </div>


                    {/* =========================
              INTRODUCTION
          ========================= */}

                    <div className={styles.section}>

                        <div className={styles.sectionHeader}>

                            <span>
                                03
                            </span>

                            <div>
                                <h2>
                                    Introduction
                                </h2>

                                <p>
                                    Short description of the
                                    newsletter.
                                </p>
                            </div>

                        </div>


                        <div className={styles.field}>

                            <label htmlFor="excerpt">
                                Short Description
                            </label>

                            <textarea
                                id="excerpt"
                                name="excerpt"
                                rows={5}
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder="Write a short introduction..."
                            />

                        </div>

                    </div>


                    {/* =========================
              CONTENT
          ========================= */}

                    <div className={styles.section}>

                        <div className={styles.sectionHeader}>

                            <span>
                                04
                            </span>

                            <div>
                                <h2>
                                    Newsletter Content
                                </h2>

                                <p>
                                    Update the full newsletter
                                    content.
                                </p>
                            </div>

                        </div>


                        <div className={styles.field}>

                            <label htmlFor="content">
                                Content
                            </label>

                            <NewsletterEditor
                                value={formData.content}
                                onChange={(content) =>
                                    setFormData((previous) => ({
                                        ...previous,
                                        content,
                                    }))
                                }
                            />

                        </div>

                    </div>


                    {error && (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}


                    {/* ACTIONS */}

                    <div className={styles.actions}>

                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() =>
                                navigate("/admin/newsletter")
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

export default AdminNewsletterEdit;