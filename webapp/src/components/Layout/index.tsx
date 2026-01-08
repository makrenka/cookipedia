import { Link, Outlet } from "react-router-dom";
import { getAllRecipiesRoute } from "../../lib/routes";
import css from "./index.module.scss";

console.log(css);

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
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
};
