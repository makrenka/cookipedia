import classNames from "classnames";
import type React from "react";
import css from "./index.module.scss";
import { Link } from "react-router-dom";

export const Button = ({
  children,
  loading = false,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) => {
  return (
    <button
      className={classNames({ [css.button]: true, [css.disabled]: loading })}
      type="submit"
      disabled={loading}
    >
      {loading ? "Submitting..." : children}
    </button>
  );
};

export const LinkButton = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <Link className={classNames({ [css.button]: true })} to={to}>
      {children}
    </Link>
  );
};
