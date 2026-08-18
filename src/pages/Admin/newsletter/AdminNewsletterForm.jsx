import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../../lib/supabase";

import styles from "./AdminNewsletterForm.module.css";

import NewsletterEditor from "../../../components/NewsletterEditor/NewsletterEditor";

function AdminNewsletterForm() {
    const navigate = useNavigate();

    const generateSlug = (academicYear, term) => {
        const year = academicYear
            .replace(/[–—]/g, "-")
            .replace(/\s+/g, "");

        const cleanTerm = term
            .toLowerCase()
            .replace(/\s+/g, "-");

        return `${year}-${cleanTerm}`;
    };

    const [formData, setFormData] = useState({
        academicYear: "2025–2026",
        term: "Term 1",
        title: "Newsletter – End of Term 1 December, 2025",
        publicationDate: "",
        excerpt: "",
        content: "",
        status: "draft",
    });

    const [coverImage, setCoverImage] = useState(null);

    const [saving, setSaving] = useState(false);
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
            setError("The cover image must be smaller than 5 MB.");
            return;
        }

        setError("");
        setCoverImage(file);
    };

    const createSlug = (academicYear, term) => {
        const year = academicYear
            .replace(/[–—]/g, "-")
            .replace(/\s+/g, "");

        return `${year.toLowerCase()}-${term
            .toLowerCase()
            .replace(/\s+/g, "-")}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSaving(true);

        try {
            let coverImageUrl = null;

            /*
             * Upload cover image
             */

            if (coverImage) {
                const extension =
                    coverImage.name.split(".").pop();

                const fileName =
                    `${crypto.randomUUID()}.${extension}`;

                const filePath =
                    `covers/${fileName}`;

                const { error: uploadError } =
                    await supabase.storage
                        .from("newsletter-images")
                        .upload(filePath, coverImage, {
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
            }

            /*
             * Create newsletter
             */

            const slug = createSlug(
                formData.academicYear,
                formData.term
            );

            const { error: insertError } =
                await supabase
                    .from("newsletters")
                    .insert({
                        academic_year: formData.academicYear,
                        term: formData.term,
                        title: formData.title,
                        slug,
                        publication_date:
                            formData.publicationDate || null,
                        excerpt: formData.excerpt || null,
                        cover_image: coverImageUrl,
                        content: formData.content || null,
                        status: formData.status,
                    });

            if (insertError) {
                throw insertError;
            }

            navigate("/admin/newsletter");

        } catch (error) {
            console.error(
                "Error creating newsletter:",
                error
            );

            setError(
                error?.message ||
                "Unable to create the newsletter."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className={styles.page}>

            {/* HEADER */}

            <header className={styles.header}>

                <div>
                    <span className={styles.eyebrow}>
                        NEWSLETTER
                    </span>

                    <h1>
                        Add Newsletter
                    </h1>

                    <p>
                        Create a new school newsletter for the
                        High Gate website.
                    </p>
                </div>

            </header>


            {/* FORM */}

            <section className={styles.content}>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >

                    {/* BASIC INFORMATION */}

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
                                    Basic information about this
                                    newsletter.
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
                                    placeholder="2025–2026"
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


                    {/* COVER */}

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
                                    This image will appear on the
                                    newsletter card and page.
                                </p>
                            </div>
                        </div>


                        <div className={styles.field}>

                            <label htmlFor="coverImage">
                                Upload Cover Image
                            </label>

                            <input
                                id="coverImage"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageChange}
                            />

                            {coverImage && (
                                <div className={styles.fileInfo}>
                                    Selected: {coverImage.name}
                                </div>
                            )}

                        </div>

                    </div>


                    {/* EXCERPT */}

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
                                    A short description shown before
                                    opening the full newsletter.
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


                    {/* CONTENT */}

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
                                    Add the full newsletter content.
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

                            <small>
                                We will replace this with a visual
                                newsletter editor after the basic
                                CMS is working.
                            </small>

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
                                : "Create Newsletter"}
                        </button>

                    </div>

                </form>

            </section>

        </main>
    );
}

export default AdminNewsletterForm;