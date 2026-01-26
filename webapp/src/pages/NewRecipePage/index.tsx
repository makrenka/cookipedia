import { Segment } from "../../components/Segment";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { trpc } from "../../lib/trpc";
import { zCreateRecipeTrpcInput } from "@cookipedia/backend/src/router/createRecipe/input";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { useForm } from "../../lib/form";
import { withPageWrapper } from "../../lib/pageWrapper";

export const NewRecipePage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createRecipe = trpc.createRecipe.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validationSchema: zCreateRecipeTrpcInput,
    onSubmit: async (values) => {
      await createRecipe.mutateAsync(values);
      formik.resetForm();
    },
    successMessage: "Recipe created!",
    showValidationAlert: true,
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
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create recipe</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
