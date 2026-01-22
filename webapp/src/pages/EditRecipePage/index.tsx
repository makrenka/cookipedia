import { useNavigate, useParams } from "react-router-dom";
import {
  getViewRecipeRoute,
  type EditRecipeRouteParams,
} from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import type { TrpcRouterOutput } from "@cookipedia/backend/src/router";
import { useState } from "react";
import { useFormik } from "formik";
import { pick } from "lodash";
import { withZodSchema } from "formik-validator-zod";
import { zUpdateRecipeTrpcInput } from "@cookipedia/backend/src/router/updateRecipe/input";
import { Segment } from "../../components/Segment";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";

const EditRecipeComponent = ({
  recipe,
}: {
  recipe: NonNullable<TrpcRouterOutput["getRecipe"]["recipe"]>;
}) => {
  const navigate = useNavigate();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const updateRecipe = trpc.updateRecipe.useMutation();
  const formik = useFormik({
    initialValues: pick(recipe, ["name", "nick", "description", "text"]),
    validate: withZodSchema(
      zUpdateRecipeTrpcInput.omit({ recipeId: true }),
    ) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        await updateRecipe.mutateAsync({ recipeId: recipe.id, ...values });
        navigate(getViewRecipeRoute({ recipeNick: values.nick }));
      } catch (
        err: any // eslint-disable-line @typescript-eslint/no-explicit-any
      ) {
        setSubmittingError(err.message);
      }
    },
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
          {!formik.isValid && !!formik.submitCount && (
            <Alert color="red">Some fields are invalid</Alert>
          )}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update recipe</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export const EditRecipePage = () => {
  const { recipeNick } = useParams() as EditRecipeRouteParams;

  const getRecipeResult = trpc.getRecipe.useQuery({ recipeNick });
  const getMeResult = trpc.getMe.useQuery();

  if (
    getRecipeResult.isLoading ||
    getRecipeResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Loading...</span>;
  }

  if (getRecipeResult.isError) {
    return <span>Error: {getRecipeResult.error.message}</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  if (!getRecipeResult.data?.recipe) {
    return <span>Recipe not found</span>;
  }

  const recipe = getRecipeResult.data.recipe;
  const me = getMeResult.data?.me;

  if (!me) {
    return <span>Only for authorized</span>;
  }

  if (me.id !== recipe.authorId) {
    return <span>A recipe can only be edited by the author</span>;
  }

  return <EditRecipeComponent recipe={recipe} />;
};
