import { Link, Outlet } from "react-router-dom";
import {
  getAllRecipiesRoute,
  getNewRecipeRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from "../../lib/routes";
import css from "./index.module.scss";
import { trpc } from "../../lib/trpc";

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery();

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
          {isLoading || isFetching || isError ? null : data?.me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getNewRecipeRoute()}>
                  Add pecipe
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignOutRoute()}>
                  Log Out {data.me.nick}
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
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
};
