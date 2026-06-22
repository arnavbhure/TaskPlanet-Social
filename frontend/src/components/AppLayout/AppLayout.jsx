import { Outlet } from "react-router-dom";
import NavLink from "../NavLink/NavLink";

function AppLayout({ routes }) {
  return (
    <div className="app-shell">
      <main className="app-shell__main">
        <Outlet />
      </main>

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
