import { useParams } from "react-router-dom";
import type { ViewRecipeRouteParams } from "../../lib/routes";
import css from "./index.module.scss";
import { Segment } from "../../components/Segment";
import { trpc } from "../../lib/trpc";

export const ViewRecipePage = () => {
  const { recipeNick } = useParams() as ViewRecipeRouteParams;

  const { data, error, isLoading, isError } = trpc.getRecipe.useQuery({
    recipeNick,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data?.recipe) {
    return <span>Recipe not found</span>;
  }

  return (
    <Segment title={data.recipe.name} description={data.recipe.description}>
      <div
        className={css.text}
        dangerouslySetInnerHTML={{ __html: data.recipe.text }}
      />
    </Segment>
  );
};
