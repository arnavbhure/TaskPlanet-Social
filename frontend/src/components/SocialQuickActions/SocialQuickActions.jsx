import { Moon, Search } from "lucide-react";

function SocialQuickActions() {
  return (
    <div className="social-search-row">
      <label className="social-search" htmlFor="social-search-input">
        <input
          id="social-search-input"
          type="search"
          aria-label="Search social"
          placeholder="Search promotions, users, posts..."
        />
      </label>

      <button className="social-action-button" type="button" aria-label="Search">
        <Search aria-hidden="true" size={24} strokeWidth={2.5} />
      </button>

      <button className="social-mode-button" type="button" aria-label="Toggle theme">
        <Moon aria-hidden="true" size={24} fill="currentColor" />
      </button>

      <button
        className="social-profile-shortcut"
        type="button"
        aria-label="Open profile"
      />
    </div>
  );
}

export default SocialQuickActions;
