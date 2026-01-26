import { useNavigate, useParams } from "react-router-dom";
import {
  getViewRecipeRoute,
  type EditRecipeRouteParams,
} from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import { pick } from "lodash";
import { zUpdateRecipeTrpcInput } from "@cookipedia/backend/src/router/updateRecipe/input";
import { Segment } from "../../components/Segment";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { useForm } from "../../lib/form";
import { withPageWrapper } from "../../lib/pageWrapper";

export const EditRecipePage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { recipeNick } = useParams() as EditRecipeRouteParams;
    return trpc.getRecipe.useQuery({ recipeNick });
  },
  checkExists: ({ queryResult }) => !!queryResult.data.recipe,
  checkExistsMessage: "Recipe not found",
  checkAccess: ({ queryResult, ctx }) =>
    !!ctx.me && ctx.me.id === queryResult.data.recipe?.authorId,
  checkAccessMessage: "A recipe can only be edited by the author",
  setProps: ({ queryResult }) => ({
    recipe: queryResult.data.recipe!,
  }),
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

// export const EditRecipePage = () => {
//   const { recipeNick } = useParams() as EditRecipeRouteParams;

//   const getRecipeResult = trpc.getRecipe.useQuery({ recipeNick });
//   const me = useMe();

//   if (getRecipeResult.isLoading || getRecipeResult.isFetching) {
//     return <span>Loading...</span>;
//   }

//   if (getRecipeResult.isError) {
//     return <span>Error: {getRecipeResult.error.message}</span>;
//   }

//   if (!getRecipeResult.data?.recipe) {
//     return <span>Recipe not found</span>;
//   }

//   const recipe = getRecipeResult.data.recipe;

//   if (!me) {
//     return <span>Only for authorized</span>;
//   }

//   if (me.id !== recipe.authorId) {
//     return <span>A recipe can only be edited by the author</span>;
//   }

//   return <EditRecipeComponent recipe={recipe} />;
// };
