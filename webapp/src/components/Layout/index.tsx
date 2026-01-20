import { Link, Outlet } from "react-router-dom";
import {
  getAllRecipiesRoute,
  getNewRecipeRoute,
  getSignInRoute,
  getSignUpRoute,
} from "../../lib/routes";
import css from "./index.module.scss";

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Cookipedia</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllRecipiesRoute()}>
              All pecipies
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getNewRecipeRoute()}>
              Add pecipe
            </Link>
          </li>
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
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
};
