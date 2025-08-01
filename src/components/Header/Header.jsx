import { NavLink, useLocation } from "react-router-dom";
import css from "./Header.module.css";
import clsx from "clsx";
import { removeUser } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSelectors";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const buildLinkPage = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const buildLinkUser = ({ isActive }) => {
  return clsx(css.userLink, isActive && css.userActive);
};

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const { name, email } = useSelector(selectUser);
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
          <div className={clsx(css.navigation, isOpen && css.mobNavigation)}>
            {isOpen && (
              <button
                className={css.menuCloseBtn}
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
            )}
            <nav className={css.menuPage}>
              <NavLink className={buildLinkPage} to="/">
                Home
              </NavLink>
              <NavLink className={buildLinkPage} to="psychologists">
                Psychologists
              </NavLink>
              {email && (
                <NavLink className={buildLinkPage} to="favorites">
                  Favorites
                </NavLink>
              )}
            </nav>
            <nav className={css.menuUser}>
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
          </div>
        </div>

        <button className={css.menuOpenBtn} onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu className={css.iconBurger} />
        </button>
      </header>
    </>
  );
};

export default Header;
