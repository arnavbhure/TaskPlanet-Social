import { NavLink as RouterNavLink } from "react-router-dom";

function NavLink({ children, to, icon: Icon }) {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        `bottom-nav__link${isActive ? " bottom-nav__link--active" : ""}`
      }
      end
      to={to}
    >
      <Icon
        className="bottom-nav__icon"
        aria-hidden="true"
        size={22}
        strokeWidth={2.25}
      />
      <span className="bottom-nav__label">{children}</span>
    </RouterNavLink>
  );
}

export default NavLink;
