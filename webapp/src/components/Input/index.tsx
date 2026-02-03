import type { FormikProps } from "formik";
import css from "./index.module.scss";
import cn from "classnames";

export const Input = <T extends Record<string, unknown>>({
  name,
  label,
  formik,
  maxWidth,
  type = "text",
}: {
  name: keyof T;
  label: string;
  formik: FormikProps<T>;
  maxWidth?: number | string;
  type?: "text" | "password";
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  const disabled = formik.isSubmitting;
  const invalid = !!touched && !!error;

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name as string}>
        {label}
      </label>
      <input
        className={cn({ [css.input]: true, [css.invalid]: invalid })}
        style={{ maxWidth }}
        type={type}
        onChange={(e) => {
          formik.setFieldValue(name as string, e.target.value);
        }}
        onBlur={() => {
          formik.setFieldTouched(name as string);
        }}
        value={value as string}
        name={name as string}
        id={name as string}
        disabled={disabled}
      />
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  );
};
