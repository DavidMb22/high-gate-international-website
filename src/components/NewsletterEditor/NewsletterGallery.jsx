import { useState } from "react";

import { Node } from "@tiptap/core";

import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { supabase } from "../../lib/supabase";

function GalleryView({
  node,
  updateAttributes,
  deleteNode,
}) {
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const images = node.attrs.images
    ? JSON.parse(node.attrs.images)
    : [];

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Remove this photo gallery from the newsletter?"
    );

    if (confirmed) {
      deleteNode();
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter(
      (_, imageIndex) => imageIndex !== index
    );

    if (updatedImages.length < 2) {
      alert(
        "A gallery must contain at least 2 images."
      );

      return;
    }

    updateAttributes({
      images: JSON.stringify(updatedImages),
    });
  };

  const addImages = async (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    const availableSlots = 4 - images.length;

    if (availableSlots <= 0) {
      alert(
        "This gallery already contains 4 images."
      );

      event.target.value = "";
      return;
    }

    if (files.length > availableSlots) {
      alert(
        `You can only add ${availableSlots} more image${
          availableSlots === 1 ? "" : "s"
        }.`
      );

      event.target.value = "";
      return;
    }

    setUploading(true);

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

      if (!uploadedImages.length) {
        return;
      }

      updateAttributes({
        images: JSON.stringify([
          ...images,
          ...uploadedImages,
        ]),
      });

    } catch (error) {
      console.error(
        "Error adding gallery images:",
        error
      );

      alert(
        "Unable to add the selected images."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <NodeViewWrapper
      className="newsletter-gallery-wrapper"
    >

      <div className="newsletter-gallery-toolbar">

        <span>
          Photo Gallery ({images.length}/4)
        </span>

        <div>

          {editing && images.length < 4 && (
            <label className="newsletter-gallery-add">
              {uploading
                ? "Uploading..."
                : "Add Photos"}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={addImages}
                disabled={uploading}
              />
            </label>
          )}

          <button
            type="button"
            onClick={() =>
              setEditing(!editing)
            }
          >
            {editing ? "Done" : "Edit"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </div>


      <div className="newsletter-gallery">

        {images.map((image, index) => (

          <div
            className="newsletter-gallery-item"
            key={`${image}-${index}`}
          >

            <img
              src={image}
              alt={`Newsletter image ${
                index + 1
              }`}
            />

            {editing && (
              <button
                type="button"
                className="newsletter-gallery-remove"
                onClick={() =>
                  removeImage(index)
                }
              >
                ×
              </button>
            )}

          </div>

        ))}

      </div>


      {editing && (
        <div className="newsletter-gallery-help">

          {images.length < 4
            ? `You can add ${
                4 - images.length
              } more photo${
                4 - images.length === 1
                  ? ""
                  : "s"
              }.`
            : "Maximum of 4 photos reached."}

        </div>
      )}

    </NodeViewWrapper>
  );
}

export const NewsletterGallery =
  Node.create({
    name: "newsletterGallery",

    group: "block",

    atom: true,

    addAttributes() {
      return {
        images: {
          default: "[]",
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: "div[data-newsletter-gallery]",
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      let images = [];

      try {
        images = JSON.parse(
          HTMLAttributes.images || "[]"
        );
      } catch {
        images = [];
      }

      return [
        "div",
        {
          "data-newsletter-gallery": "",
          class: "newsletter-gallery",
        },

        ...images.map((image) => [
          "div",
          {
            class:
              "newsletter-gallery-item",
          },
          [
            "img",
            {
              src: image,
              alt: "Newsletter image",
            },
          ],
        ]),
      ];
    },

    addNodeView() {
      return ReactNodeViewRenderer(
        GalleryView
      );
    },
  });