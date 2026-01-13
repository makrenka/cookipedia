import type { FormikProps } from "formik";

export const Textarea = <T extends Record<string, unknown>>({
  name,
  label,
  formik,
}: {
  name: keyof T;
  label: string;
  formik: FormikProps<T>;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name as string}>{label}</label>
      <br />
      <textarea
        onChange={(e) => {
          formik.setFieldValue(name as string, e.target.value);
        }}
        value={value as string}
        name={name as string}
        id={name as string}
      />
      {!!touched && !!error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};
