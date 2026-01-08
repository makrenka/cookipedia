import { Link } from "react-router-dom";
import { trpc } from "../../lib/trpc";
import { getViewRecipeRoute } from "../../lib/routes";
import css from "./index.module.scss";

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
      <h1 className={css.title}>All recipies</h1>
      <div className={css.recipies}>
        {data?.recipies.map((recipe) => (
          <div className={css.recipe} key={recipe.nick}>
            <h2 className={css.recipeName}>
              <Link
                to={getViewRecipeRoute({ recipeNick: recipe.nick })}
                className={css.recipeLink}
              >
                {recipe.name}
              </Link>
            </h2>
            <p className={css.recipeDescription}>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
