import { Link, Outlet } from "react-router-dom";
import Logo from "../../assets/images/logo.svg?react";
import {
  getAllRecipiesRoute,
  getEditProfileRoute,
  getNewRecipeRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from "@cookipedia/shared/routes";
import css from "./index.module.scss";
import { useMe } from "../../lib/ctx";
import { createRef } from "react";

export const layoutContentElRef = createRef<HTMLDivElement>();

export const Layout = () => {
  const me = useMe();

  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <Logo className={css.logo} />
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllRecipiesRoute()}>
              All pecipies
            </Link>
          </li>
          {me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getNewRecipeRoute()}>
                  Add pecipe
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getEditProfileRoute()}>
                  Edit Profile
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignOutRoute()}>
                  Log Out {me.nick}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getSignUpRoute()}>
                  Sign Up
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignInRoute()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  );
};
