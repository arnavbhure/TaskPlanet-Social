import { Bell, IndianRupee, Star } from "lucide-react";

const stats = [
  {
    id: "points",
    label: "50",
    icon: Star,
    variant: "points",
  },
  {
    id: "wallet",
    label: "0.00",
    icon: IndianRupee,
    variant: "wallet",
  },
];

function SocialHeader() {
  return (
    <header className="social-header">
      <div className="social-header__title-group">
        <h1 id="social-page-title">Social</h1>
      </div>

      <div className="social-header__actions" aria-label="Account stats">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <span
              className={`social-stat-pill social-stat-pill--${item.variant}`}
              key={item.id}
            >
              {item.variant === "wallet" && (
                <Icon aria-hidden="true" size={17} strokeWidth={2.4} />
              )}
              <span>{item.label}</span>
              {item.variant === "points" && (
                <span className="social-stat-pill__icon" aria-hidden="true">
                  <Icon size={16} fill="currentColor" />
                </span>
              )}
            </span>
          );
        })}

        <button
          className="social-notification-button"
          type="button"
          aria-label="Notifications"
        >
          <Bell aria-hidden="true" size={21} fill="currentColor" strokeWidth={2.1} />
        </button>

        <button className="social-avatar-button" type="button" aria-label="Profile">
          <span className="social-avatar-button__badge">20%</span>
        </button>
      </div>
    </header>
  );
}

export default SocialHeader;
