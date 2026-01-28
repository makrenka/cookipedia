import { Link } from "react-router-dom";
import { trpc } from "../../../lib/trpc";
import { getViewRecipeRoute } from "../../../lib/routes";
import css from "./index.module.scss";
import { Segment } from "../../../components/Segment";

export const AllRecipiesPage = () => {
  const { data, error, isLoading, isError } = trpc.getRecipies.useQuery();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Segment title="All recipies">
      <div className={css.recipies}>
        {data?.recipies.map((recipe) => (
          <div className={css.recipe} key={recipe.nick}>
            <Segment
              size={2}
              title={
                <Link
                  to={getViewRecipeRoute({ recipeNick: recipe.nick })}
                  className={css.recipeLink}
                >
                  {recipe.name}
                </Link>
              }
              description={recipe.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  );
};
