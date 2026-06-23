import { Heart, MessageSquare, Send, Share2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { addCommentApi, toggleLikeApi } from "../../api/posts/postsApi";

const metricItems = [
  { key: "likes", label: "likes", icon: Heart },
  { key: "comments", label: "comments", icon: MessageSquare },
  { key: "shares", label: "shares", icon: Share2 },
];

function formatCommentTime(dateLike) {
  if (!dateLike) return "Just now";

  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) return "Just now";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function SocialPostCard({ post }) {
  const {
    avatarLabel,
    avatarUrl,
    handle,
    image,
    text,
    timestamp,
    username,
    image_url,
    id,
    _id,
  } = post;

  const postId = id || _id;

  const [likesCount, setLikesCount] = useState(
    Array.isArray(post.likes) ? post.likes.length : 0,
  );
  const [isLiked, setIsLiked] = useState(Boolean(post.likedByMe));
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const commentsCount = comments.length;

  const sharesCount =
    typeof post.sharesCount === "number" ? post.sharesCount : 0;

  const cardImage =
    image?.src || image_url
      ? {
          src: image?.src || image_url,
          alt: image?.alt || "Post image",
        }
      : null;

  const handleLike = async () => {
    if (isLiking || !postId) return;

    setIsLiking(true);
    try {
      const response = await toggleLikeApi(postId);
      if (response?.success) {
        setIsLiked(response.liked);
        setLikesCount(response.likesCount);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update like");
    } finally {
      setIsLiking(false);
    }
  };

  const handleToggleComments = () => {
    setShowComments((current) => !current);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const trimmed = commentText.trim();
    if (!trimmed || isCommenting || !postId) return;

    setIsCommenting(true);
    try {
      const response = await addCommentApi(postId, { text: trimmed });
      if (response?.success && response.comment) {
        setComments((current) => [...current, response.comment]);
        setCommentText("");
        if (!showComments) {
          setShowComments(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment");
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <article className="social-post-card">
      <header className="social-post-card__header">
        <div className="social-post-card__author">
          {avatarUrl ? (
            <img className="social-post-card__avatar" src={avatarUrl} alt="" />
          ) : (
            <span className="social-post-card__avatar" aria-hidden="true">
              {avatarLabel || username?.charAt(0)?.toUpperCase()}
            </span>
          )}

          <div className="social-post-card__author-text">
            <h2>{username}</h2>
            <p>{handle}</p>
            <time>{timestamp}</time>
          </div>
        </div>

        <button className="social-post-card__follow" type="button">
          Follow
        </button>
      </header>

      <p className="social-post-card__text">{text}</p>

      {cardImage && (
        <img
          className="social-post-card__image"
          src={cardImage.src}
          alt={cardImage.alt}
        />
      )}

      <footer className="social-post-card__metrics" aria-label="Post metrics">
        {metricItems.map((item) => {
          const Icon = item.icon;
          const value =
            item.key === "likes"
              ? likesCount
              : item.key === "comments"
                ? commentsCount
                : sharesCount;

          if (item.key === "likes") {
            return (
              <button
                className={`social-post-card__metric social-post-card__metric--button${
                  isLiked ? " social-post-card__metric--liked" : ""
                }`}
                key={item.key}
                type="button"
                aria-pressed={isLiked}
                aria-label={`${value} ${item.label}`}
                onClick={handleLike}
                disabled={isLiking}
              >
                <Icon
                  aria-hidden="true"
                  size={26}
                  strokeWidth={2.25}
                  fill={isLiked ? "currentColor" : "none"}
                />
                <span>{value}</span>
              </button>
            );
          }

          if (item.key === "comments") {
            return (
              <button
                className={`social-post-card__metric social-post-card__metric--button${
                  showComments ? " social-post-card__metric--active" : ""
                }`}
                key={item.key}
                type="button"
                aria-expanded={showComments}
                aria-label={`${value} ${item.label}`}
                onClick={handleToggleComments}
              >
                <Icon aria-hidden="true" size={26} strokeWidth={2.25} />
                <span>{value}</span>
              </button>
            );
          }

          return (
            <span className="social-post-card__metric" key={item.key}>
              <Icon aria-hidden="true" size={26} strokeWidth={2.25} />
              <span aria-label={`${value} ${item.label}`}>{value}</span>
            </span>
          );
        })}
      </footer>

      {showComments && (
        <section
          className="social-post-card__comments"
          aria-label="Post comments"
        >
          {comments.length > 0 ? (
            <ul className="social-post-card__comment-list">
              {comments.map((comment, index) => (
                <li
                  className="social-post-card__comment"
                  key={comment._id || `${comment.username}-${index}`}
                >
                  <div className="social-post-card__comment-header">
                    <strong>{comment.username}</strong>
                    <time>{formatCommentTime(comment.created_at)}</time>
                  </div>
                  <p>{comment.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="social-post-card__comments-empty">No comments yet.</p>
          )}

          <form
            className="social-post-card__comment-form"
            onSubmit={handleCommentSubmit}
          >
            <input
              type="text"
              className="social-post-card__comment-input"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              disabled={isCommenting}
              aria-label="Comment text"
            />
            <button
              className="social-post-card__comment-submit"
              type="submit"
              disabled={isCommenting || !commentText.trim()}
              aria-label="Submit comment"
            >
              <Send aria-hidden="true" size={20} />
            </button>
          </form>
        </section>
      )}
    </article>
  );
}

export default SocialPostCard;
