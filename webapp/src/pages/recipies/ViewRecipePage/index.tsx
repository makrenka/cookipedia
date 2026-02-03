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
import type { TrpcRouterOutput } from "@cookipedia/backend/src/router";

const LikeButton = ({
  recipe,
}: {
  recipe: NonNullable<TrpcRouterOutput["getRecipe"]["recipe"]>;
}) => {
  const trpcUtils = trpc.useUtils();
  const setRecipeLike = trpc.setRecipeLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetRecipeData = trpcUtils.getRecipe.getData({
        recipeNick: recipe.nick,
      });
      if (oldGetRecipeData?.recipe) {
        const newGetRecipeData = {
          ...oldGetRecipeData,
          recipe: {
            ...oldGetRecipeData.recipe,
            isLikedByMe,
            likesCount:
              oldGetRecipeData.recipe.likesCount + (isLikedByMe ? 1 : -1),
          },
        };
        trpcUtils.getRecipe.setData(
          { recipeNick: recipe.nick },
          newGetRecipeData,
        );
      }
    },
    onSuccess: () => {
      void trpcUtils.getRecipe.invalidate({ recipeNick: recipe.nick });
    },
  });

  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setRecipeLike.mutateAsync({
          recipeId: recipe.id,
          isLikedByMe: !recipe.isLikedByMe,
        });
      }}
    >
      {recipe.isLikedByMe ? "Unlike" : "Like"}
    </button>
  );
};

export const ViewRecipePage = withPageWrapper({
  useQuery: () => {
    const { recipeNick } = useParams() as ViewRecipeRouteParams;
    return trpc.getRecipe.useQuery({ recipeNick });
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    recipe: checkExists(queryResult.data.recipe, "Recipe not found"),
    me: ctx.me,
  }),
  showLoaderOnFetching: false,
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
      <div className={css.likes}>
        Likes: {recipe.likesCount}
        {me && (
          <>
            <br />
            <LikeButton recipe={recipe} />
          </>
        )}
      </div>
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
