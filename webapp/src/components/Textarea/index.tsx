import type { FormikProps } from "formik";
import cn from "classnames";
import css from "./index.module.scss";

export const Textarea = <T extends Record<string, unknown>>({
  name,
  label,
  formik,
  maxWidth,
}: {
  name: keyof T;
  label: string;
  formik: FormikProps<T>;
  maxWidth?: number;
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
      <textarea
        className={cn({ [css.input]: true, [css.invalid]: invalid })}
        style={{ maxWidth }}
        onChange={(e) => {
          formik.setFieldValue(name as string, e.target.value);
        }}
        value={value as string}
        name={name as string}
        id={name as string}
        disabled={disabled}
      />
      {invalid && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};
