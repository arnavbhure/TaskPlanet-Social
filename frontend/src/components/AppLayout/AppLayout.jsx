import { Outlet } from "react-router-dom";
import NavLink from "../NavLink/NavLink";

function AppLayout({ routes }) {
  const handleCreate = () => {
    // Requested behavior: after tapping the FAB, scroll to the top.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <main className="app-shell__main">
        <Outlet />
      </main>

      <button
        className="fab"
        type="button"
        aria-label="Create"
        onClick={handleCreate}
      >
        <span className="fab__plus" aria-hidden="true">
          +
        </span>
      </button>

      <nav className="bottom-nav" aria-label="Primary navigation">
        {routes.map((route) => (
          <NavLink key={route.path} to={route.path}>
            {route.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default AppLayout;
