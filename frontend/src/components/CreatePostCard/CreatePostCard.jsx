import { Camera, List, Megaphone, Send, Smile } from "lucide-react";

const tabs = ["All Posts", "Promotions"];

function CreatePostCard() {
  return (
    <section className="create-post-card" aria-labelledby="create-post-title">
      <div className="create-post-card__header">
        <h2 id="create-post-title">Create Post</h2>

        <div className="create-post-tabs" aria-label="Post category">
          {tabs.map((tab, index) => (
            <button
              className={`create-post-tabs__button${
                index === 0 ? " create-post-tabs__button--active" : ""
              }`}
              key={tab}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <textarea
        className="create-post-card__textarea"
        aria-label="Post content"
        placeholder="What's on your mind?"
      />

      <div className="create-post-card__footer">
        <div className="create-post-actions" aria-label="Post actions">
          <button type="button" aria-label="Add photo">
            <Camera aria-hidden="true" size={24} strokeWidth={2.4} />
          </button>
          <button type="button" aria-label="Add mood">
            <Smile aria-hidden="true" size={25} strokeWidth={2.4} />
          </button>
          <button type="button" aria-label="Add details">
            <List aria-hidden="true" size={27} strokeWidth={2.4} />
          </button>
          <button className="create-post-actions__promote" type="button">
            <Megaphone aria-hidden="true" size={24} fill="currentColor" />
            <span>Promote</span>
          </button>
        </div>

        <button className="create-post-submit" type="button" disabled>
          <Send aria-hidden="true" size={25} fill="currentColor" />
          <span>Post</span>
        </button>
      </div>
    </section>
  );
}

export default CreatePostCard;
