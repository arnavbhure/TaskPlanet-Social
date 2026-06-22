const filters = [
  "All Post",
  "For You",
  "Most Liked",
  "Most Commented",
  "Most Shared",
];

function SocialFilterChips() {
  return (
    <div className="social-filter-row" aria-label="Feed filters">
      {filters.map((filter, index) => (
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
  );
}

export default SocialFilterChips;
