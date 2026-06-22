import { NavLink as RouterNavLink } from "react-router-dom";

function NavLink({ children, to }) {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        `bottom-nav__link${isActive ? " bottom-nav__link--active" : ""}`
      }
      to={to}
    >
      {children}
    </RouterNavLink>
  );
}

export default NavLink;
