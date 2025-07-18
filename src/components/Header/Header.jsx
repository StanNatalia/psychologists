import { NavLink, useLocation } from "react-router-dom";
import css from "./Header.module.css";
import clsx from "clsx";

const buildLinkPage = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const buildLinkUser = ({ isActive }) => {
  return clsx(css.userLink, isActive && css.userActive);
};

const Header = () => {
  const location = useLocation();
  return (
    <>
      <header className={css.header}>
        <div className={css.wrapper}>
          <NavLink to="/">
            <button className={css.logo}>
              <span className={css.span}>psychologists.</span>services
            </button>
          </NavLink>
          <nav className={css.navPage}>
            <NavLink className={buildLinkPage} to="/">
              Home
            </NavLink>
            <NavLink className={buildLinkPage} to="psychologists">
              Psychologists
            </NavLink>
          </nav>
        </div>
        <nav className={css.navUser}>
          <NavLink
            className={buildLinkUser}
            to="/login"
            state={{ backgroundLocation: location }}
          >
            Log In
          </NavLink>
          <NavLink
            className={buildLinkUser}
            to="/registration"
            state={{ backgroundLocation: location }}
          >
            Registration
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Header;
