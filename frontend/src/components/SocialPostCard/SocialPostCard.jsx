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
  const { avatarLabel, avatarUrl, handle, image, metrics, text, timestamp, username } =
    post;

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

      {image && (
        <img className="social-post-card__image" src={image.src} alt={image.alt} />
      )}

      <footer className="social-post-card__metrics" aria-label="Post metrics">
        {metricItems.map((item) => {
          const Icon = item.icon;

          return (
            <span className="social-post-card__metric" key={item.key}>
              <Icon aria-hidden="true" size={26} strokeWidth={2.25} />
              <span aria-label={`${metrics[item.key]} ${item.label}`}>
                {metrics[item.key]}
              </span>
            </span>
          );
        })}
      </footer>
    </article>
  );
}

export default SocialPostCard;
