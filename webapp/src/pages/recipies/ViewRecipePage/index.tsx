import { useParams } from "react-router-dom";
import { format } from "date-fns/format";
import {
  getEditRecipeRoute,
  type ViewRecipeRouteParams,
} from "../../../lib/routes";
import css from "./index.module.scss";
import { Segment } from "../../../components/Segment";
import { trpc } from "../../../lib/trpc";
import { LinkButton } from "../../../components/Button";
import { withPageWrapper } from "../../../lib/pageWrapper";

export const ViewRecipePage = withPageWrapper({
  useQuery: () => {
    const { recipeNick } = useParams() as ViewRecipeRouteParams;
    return trpc.getRecipe.useQuery({ recipeNick });
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    recipe: checkExists(queryResult.data.recipe, "Recipe not found"),
    me: ctx.me,
  }),
})(({ recipe, me }) => {
  return (
    <Segment title={recipe.name} description={recipe.description}>
      <div className={css.createdAt}>
        Created at: {format(recipe.createdAt, "yyyy-MM-dd")}
      </div>
      <div className={css.author}>
        Author: {recipe.author.nick}
        {recipe.author.name ? ` (${recipe.author.name})` : ""}
      </div>
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
});
