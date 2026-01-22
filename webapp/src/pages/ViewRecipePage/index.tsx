import { useParams } from "react-router-dom";
import { format } from "date-fns/format";
import {
  getEditRecipeRoute,
  type ViewRecipeRouteParams,
} from "../../lib/routes";
import css from "./index.module.scss";
import { Segment } from "../../components/Segment";
import { trpc } from "../../lib/trpc";
import { LinkButton } from "../../components/Button";

export const ViewRecipePage = () => {
  const { recipeNick } = useParams() as ViewRecipeRouteParams;

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

  return (
    <Segment title={recipe.name} description={recipe.description}>
      <div className={css.createdAt}>
        Created at: {format(recipe.createdAt, "yyyy-MM-dd")}
      </div>
      <div className={css.author}>Author: {recipe.author.nick}</div>
      <div
        className={css.text}
        dangerouslySetInnerHTML={{ __html: recipe.text }}
      />
      {me?.id === recipe.authorId && (
        <div className={css.editButton}>
          <LinkButton to={getEditRecipeRoute({ recipeNick: recipe.nick })}>
            Edit recipe
          </LinkButton>
        </div>
      )}
    </Segment>
  );
};
