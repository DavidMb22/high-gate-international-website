import { useEffect } from "react";

import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

import { supabase } from "../../lib/supabase";

import styles from "./NewsletterEditor.module.css";

import { NewsletterGallery } from "./NewsletterGallery";

function NewsletterEditor({
    value,
    onChange,
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,

            Image.configure({
                inline: false,
                allowBase64: false,
            }),

            Link.configure({
                openOnClick: false,
                autolink: true,
            }),

            NewsletterGallery,

        ],

        content: value || "",

        editorProps: {
            attributes: {
                class: styles.editor,
            },
        },

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) return;

        if (value !== editor.getHTML()) {
            editor.commands.setContent(value || "");
        }
    }, [value, editor]);

    if (!editor) {
        return (
            <div className={styles.loading}>
                Loading editor...
            </div>
        );
    }

    const addImages = async (event) => {
        const files = Array.from(
            event.target.files || []
        );

        if (!files.length) return;

        try {
            for (const file of files) {
                if (!file.type.startsWith("image/")) {
                    continue;
                }

                if (file.size > 5 * 1024 * 1024) {
                    alert(
                        `${file.name} is larger than 5 MB.`
                    );
                    continue;
                }

                const extension =
                    file.name.split(".").pop();

                const fileName =
                    `${crypto.randomUUID()}.${extension}`;

                const filePath =
                    `content/${fileName}`;

                const { error: uploadError } =
                    await supabase.storage
                        .from("newsletter-images")
                        .upload(filePath, file, {
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

                editor
                    .chain()
                    .focus()
                    .setImage({
                        src: data.publicUrl,
                        alt: file.name,
                    })
                    .run();
            }
        } catch (error) {
            console.error(
                "Error uploading newsletter image:",
                error
            );

            alert(
                "Unable to upload one or more images."
            );
        }

        event.target.value = "";
    };

    const addGallery = async (event) => {
        const files = Array.from(
            event.target.files || []
        );

        if (!files.length) return;

        if (files.length < 2) {
            alert(
                "Please select at least 2 images for a gallery."
            );

            event.target.value = "";
            return;
        }

        if (files.length > 4) {
            alert(
                "A gallery can contain a maximum of 4 images."
            );

            event.target.value = "";
            return;
        }

        try {
            const uploadedImages = [];

            for (const file of files) {
                if (!file.type.startsWith("image/")) {
                    continue;
                }

                if (file.size > 5 * 1024 * 1024) {
                    alert(
                        `${file.name} is larger than 5 MB.`
                    );

                    continue;
                }

                const extension =
                    file.name.split(".").pop();

                const fileName =
                    `${crypto.randomUUID()}.${extension}`;

                const filePath =
                    `content/gallery/${fileName}`;

                const { error: uploadError } =
                    await supabase.storage
                        .from("newsletter-images")
                        .upload(filePath, file, {
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

                uploadedImages.push(
                    data.publicUrl
                );
            }

            if (uploadedImages.length < 2) {
                alert(
                    "At least 2 images are required."
                );

                return;
            }

            editor
                .chain()
                .focus()
                .insertContent({
                    type: "newsletterGallery",
                    attrs: {
                        images: JSON.stringify(
                            uploadedImages
                        ),
                    },
                })
                .run();

        } catch (error) {
            console.error(
                "Error uploading gallery:",
                error
            );

            alert(
                "Unable to upload the gallery."
            );
        }

        event.target.value = "";
    };

    const addLink = () => {
        const previousUrl =
            editor.getAttributes("link").href;

        const url = window.prompt(
            "Enter the URL:",
            previousUrl || "https://"
        );

        if (url === null) return;

        if (url === "") {
            editor
                .chain()
                .focus()
                .unsetLink()
                .run();

            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({
                href: url,
            })
            .run();
    };

    return (
        <div className={styles.wrapper}>

            {/* TOOLBAR */}

            <div className={styles.toolbar}>

                <button
                    type="button"
                    className={
                        editor.isActive("bold")
                            ? styles.activeButton
                            : styles.button
                    }
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                >
                    B
                </button>


                <button
                    type="button"
                    className={
                        editor.isActive("italic")
                            ? styles.activeButton
                            : styles.button
                    }
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                >
                    I
                </button>


                <div className={styles.separator} />


                <button
                    type="button"
                    className={
                        editor.isActive("heading", {
                            level: 2,
                        })
                            ? styles.activeButton
                            : styles.button
                    }
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({
                                level: 2,
                            })
                            .run()
                    }
                >
                    H2
                </button>


                <button
                    type="button"
                    className={
                        editor.isActive("heading", {
                            level: 3,
                        })
                            ? styles.activeButton
                            : styles.button
                    }
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({
                                level: 3,
                            })
                            .run()
                    }
                >
                    H3
                </button>


                <div className={styles.separator} />


                <button
                    type="button"
                    className={styles.button}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                    }
                >
                    • List
                </button>


                <button
                    type="button"
                    className={styles.button}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                    }
                >
                    1. List
                </button>


                <div className={styles.separator} />


                <button
                    type="button"
                    className={styles.button}
                    onClick={addLink}
                >
                    Link
                </button>


                <label className={styles.imageButton}>
                    Image

                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        onChange={addImages}
                    />
                </label>

                <label className={styles.imageButton}>
                    Gallery

                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        onChange={addGallery}
                    />
                </label>


                <div className={styles.separator} />


                <button
                    type="button"
                    className={styles.button}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                >
                    Undo
                </button>


                <button
                    type="button"
                    className={styles.button}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                >
                    Redo
                </button>

            </div>


            {/* EDITOR */}

            <EditorContent editor={editor} />

            <div className={styles.help}>
                You can select multiple images at once.
                Images are uploaded directly to Supabase.
            </div>

        </div>
    );
}

export default NewsletterEditor;