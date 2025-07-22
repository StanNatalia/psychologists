import { NavLink, useLocation } from "react-router-dom";
import css from "./Header.module.css";
import clsx from "clsx";
import { removeUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const buildLinkPage = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const buildLinkUser = ({ isActive }) => {
  return clsx(css.userLink, isActive && css.userActive);
};

const Header = () => {
  const location = useLocation();

  const { name, email } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
  };

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
          {email ? (
            <div className={css.userWrapper}>
              <div className={css.username}>
                <div className={css.iconWrapper}>
                  <svg width="24" height="24">
                    <use href="/sprite.svg#icon-user" />
                  </svg>
                </div>
                {name}
              </div>
              <button className={css.userLink} onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
