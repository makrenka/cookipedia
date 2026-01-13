import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";
import { Segment } from "../../components/Segment";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";

const schema = z.object({
  name: z.string().min(1),
  nick: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      "Nick may contain only lowercase letters, numbers and dashes"
    ),
  description: z.string().min(1),
  text: z.string().min(100, "Text should be at least 100 characters long"),
});

type FormValues = z.infer<typeof schema>;

export const NewRecipePage = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validate: withZodSchema(schema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    onSubmit: (values) => {
      console.info("Submitted", values);
    },
  });

  return (
    <Segment title="New recipe">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: "red" }}>Some fields are invalid</div>
        )}
        <button type="submit">Create recipe</button>
      </form>
    </Segment>
  );
};
