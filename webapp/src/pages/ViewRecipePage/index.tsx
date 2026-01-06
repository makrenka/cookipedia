import { useParams } from "react-router-dom";
import type { ViewRecipeRouteParams } from "../../lib/routes";
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
    <div>
      <h1>{data.recipe.name}</h1>
      <p>{data.recipe.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data.recipe.text }} />
    </div>
  );
};
