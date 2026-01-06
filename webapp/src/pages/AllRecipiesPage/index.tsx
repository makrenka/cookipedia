import { Link } from "react-router-dom";
import { trpc } from "../../lib/trpc";
import { getViewRecipeRoute } from "../../lib/routes";

export const AllRecipiesPage = () => {
  const { data, error, isLoading, isError } = trpc.getRecipies.useQuery();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h1>All recipies</h1>
      {data?.recipies.map((recipe) => {
        return (
          <div key={recipe.nick}>
            <h2>
              <Link to={getViewRecipeRoute({ recipeNick: recipe.nick })}>
                {recipe.name}
              </Link>
            </h2>
            <p>{recipe.description}</p>
          </div>
        );
      })}
    </div>
  );
};
