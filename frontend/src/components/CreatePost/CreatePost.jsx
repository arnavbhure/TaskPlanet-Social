import { Camera, Send, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { createPostApi } from "../../api/posts/postsApi";
import "./CreatePost.css";

function timeLabelFromDate(dateLike) {
  if (!dateLike) return "Just now";

  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "Just now";

  const diffMs = Date.now() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const canPost = useMemo(() => {
    const hasText = text.trim().length > 0;
    const hasImage = Boolean(selectedImage);
    return hasText || hasImage;
  }, [text, selectedImage]);

  const clearImage = () => {
    setSelectedImage(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    clearImage();

    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setError("");
  };

  const handleSubmit = async () => {
    if (!canPost) {
      setError("Post must contain text or image");
      return;
    }

    setIsPosting(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("text", text.trim());
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const created = await createPostApi(formData);

      setText("");
      clearImage();
      setSuccess("Posted successfully");
      toast.success("Post created");

      // Let parent prepend after we cleared; onPostCreated should map itself if needed.
      onPostCreated?.(created);
    } catch (e) {
      const serverMessage = e?.response?.data?.message;
      setError(serverMessage || "Failed to create post");
      toast.error(serverMessage || "Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <section className="create-post-card" aria-label="Create post">
      <div className="create-post-card__header">
        <h2 className="create-post-card__title">Create Post</h2>

        <div className="create-post-card__tab-placeholder" aria-hidden="true" />
      </div>

      <textarea
        className="create-post-card__textarea"
        aria-label="Post content"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {previewUrl && (
        <div
          className="create-post-preview"
          aria-label="Selected image preview"
        >
          <img
            className="create-post-preview__img"
            src={previewUrl}
            alt="Preview"
          />
          <button
            type="button"
            className="create-post-preview__remove"
            onClick={clearImage}
            aria-label="Remove selected image"
          >
            <Trash2 aria-hidden="true" size={18} />
          </button>
        </div>
      )}

      <div className="create-post-card__footer">
        <div className="create-post-actions" aria-label="Post actions">
          <label className="create-post-image-button" aria-label="Add photo">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              disabled={isPosting}
            />
            <Camera aria-hidden="true" size={24} strokeWidth={2.4} />
          </label>
        </div>

        <button
          className="create-post-submit"
          type="button"
          onClick={handleSubmit}
          disabled={isPosting}
        >
          <Send aria-hidden="true" size={25} fill="currentColor" />
          <span>{isPosting ? "Posting" : "Post"}</span>
        </button>
      </div>

      {error && (
        <p className="create-post-feedback create-post-feedback--error">
          {error}
        </p>
      )}
      {success && (
        <p className="create-post-feedback create-post-feedback--success">
          {success}
        </p>
      )}
    </section>
  );
}

export default CreatePost;
