import { useNavigate } from "react-router-dom";
import { getEditRecipeRoute, getViewRecipeRoute } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import { pick } from "lodash";
import { zUpdateRecipeTrpcInput } from "@cookipedia/backend/src/router/recipies/updateRecipe/input";
import { Segment } from "../../../components/Segment";
import { FormItems } from "../../../components/FormItems";
import { Input } from "../../../components/Input";
import { Textarea } from "../../../components/Textarea";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { useForm } from "../../../lib/form";
import { withPageWrapper } from "../../../lib/pageWrapper";
import { canEditRecipe } from "@cookipedia/backend/src/utils/can";

export const EditRecipePage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { recipeNick } = getEditRecipeRoute.useParams();
    return trpc.getRecipe.useQuery({ recipeNick });
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const recipe = checkExists(queryResult.data.recipe, "Recipe not found");
    checkAccess(
      canEditRecipe(ctx.me, recipe),
      "A recipe can only be edited by the author",
    );
    return {
      recipe,
    };
  },
  title: "Edit Recipe",
})(({ recipe }) => {
  const navigate = useNavigate();
  const updateRecipe = trpc.updateRecipe.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(recipe, ["name", "nick", "description", "text"]),
    validationSchema: zUpdateRecipeTrpcInput.omit({ recipeId: true }) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    onSubmit: async (values) => {
      await updateRecipe.mutateAsync({ recipeId: recipe.id, ...values });
      navigate(getViewRecipeRoute({ recipeNick: values.nick }));
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  });

  return (
    <Segment title={`Edit recipe: ${recipe.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Description"
            name="description"
            maxWidth={500}
            formik={formik}
          />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update recipe</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
