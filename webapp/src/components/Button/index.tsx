import classNames from "classnames";
import type React from "react";
import css from "./index.module.scss";

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
