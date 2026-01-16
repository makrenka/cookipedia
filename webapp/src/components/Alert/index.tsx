import classNames from "classnames";
import type React from "react";
import css from "./index.module.scss";

export const Alert = ({
  color,
  children,
}: {
  color: "red" | "green";
  children: React.ReactNode;
}) => {
  return (
    <div className={classNames({ [css.alert]: true, [css[color]]: true })}>
      {children}
    </div>
  );
};
