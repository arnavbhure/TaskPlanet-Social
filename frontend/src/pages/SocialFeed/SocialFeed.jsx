import SocialHeader from "../../components/SocialHeader/SocialHeader";
import SocialQuickActions from "../../components/SocialQuickActions/SocialQuickActions";

const filterItems = [
  "All Post",
  "For You",
  "Most Liked",
  "Most Commented",
  "Most Shared",
];

function SocialFeed() {
  return (
    <section className="social-page" aria-labelledby="social-page-title">
      <SocialHeader />

      <SocialQuickActions />

      <main className="social-content" aria-label="Social feed content">
        <div className="social-filter-row" aria-label="Feed filters">
          {filterItems.map((filter, index) => (
            <button
              className={`social-filter-chip${
                index === 0 ? " social-filter-chip--active" : ""
              }`}
              key={filter}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="social-feed-surface" aria-hidden="true" />
      </main>
    </section>
  );
}

export default SocialFeed;
