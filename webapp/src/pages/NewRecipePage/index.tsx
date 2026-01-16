import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";
import { Segment } from "../../components/Segment";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { trpc } from "../../lib/trpc";
import { zCreateRecipeTrpcInput } from "@cookipedia/backend/src/router/createRecipe/input";
import { useState } from "react";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";

type FormValues = z.infer<typeof zCreateRecipeTrpcInput>;

export const NewRecipePage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const createRecipe = trpc.createRecipe.useMutation();
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validate: withZodSchema(zCreateRecipeTrpcInput) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    onSubmit: async (values) => {
      try {
        await createRecipe.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (
        error: any // eslint-disable-line @typescript-eslint/no-explicit-any
      ) {
        setSubmittingError(error.message);
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
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
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input
            name="description"
            label="Description"
            formik={formik}
            maxWidth={500}
          />
          <Textarea name="text" label="Text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && (
            <div style={{ color: "red" }}>Some fields are invalid</div>
          )}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && (
            <Alert color="green">Recipe created!</Alert>
          )}
          <Button loading={formik.isSubmitting}>Create recipe</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
