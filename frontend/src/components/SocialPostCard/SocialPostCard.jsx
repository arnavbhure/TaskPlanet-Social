import { Heart, MessageSquare, Share2 } from "lucide-react";

const metricItems = [
  {
    key: "likes",
    label: "Likes",
    icon: Heart,
  },
  {
    key: "comments",
    label: "Comments",
    icon: MessageSquare,
  },
  {
    key: "shares",
    label: "Shares",
    icon: Share2,
  },
];

function SocialPostCard({ post }) {
  // Support both existing mockPosts shape AND backend shape
  const {
    avatarLabel,
    avatarUrl,
    handle,
    image,
    metrics,
    text,
    timestamp,
    username,
    image_url,
    likes,
    comments,
  } = post;

  const likesCount =
    typeof metrics?.likes === "number"
      ? metrics.likes
      : Array.isArray(likes)
        ? likes.length
        : typeof post.likesCount === "number"
          ? post.likesCount
          : 0;

  const commentsCount =
    typeof metrics?.comments === "number"
      ? metrics.comments
      : Array.isArray(comments)
        ? comments.length
        : typeof post.commentsCount === "number"
          ? post.commentsCount
          : 0;

  const sharesCount =
    typeof metrics?.shares === "number"
      ? metrics.shares
      : typeof post.sharesCount === "number"
        ? post.sharesCount
        : 0;

  const cardImage =
    image?.src || image_url
      ? {
          src: image?.src || image_url,
          alt: image?.alt || "Post image",
        }
      : null;

  return (
    <article className="social-post-card">
      <header className="social-post-card__header">
        <div className="social-post-card__author">
          {avatarUrl ? (
            <img className="social-post-card__avatar" src={avatarUrl} alt="" />
          ) : (
            <span className="social-post-card__avatar" aria-hidden="true">
              {avatarLabel}
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

          return (
            <span className="social-post-card__metric" key={item.key}>
              <Icon aria-hidden="true" size={26} strokeWidth={2.25} />
              <span aria-label={`${value} ${item.label}`}>{value}</span>
            </span>
          );
        })}
      </footer>
    </article>
  );
}

export default SocialPostCard;
