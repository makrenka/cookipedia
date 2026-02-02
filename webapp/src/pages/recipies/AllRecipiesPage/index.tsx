import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { trpc } from "../../../lib/trpc";
import { getViewRecipeRoute } from "../../../lib/routes";
import css from "./index.module.scss";
import { Segment } from "../../../components/Segment";
import { Alert } from "../../../components/Alert";
import { layoutContentElRef } from "../../../components/Layout";
import { Loader } from "../../../components/Loader";

export const AllRecipiesPage = () => {
  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = trpc.getRecipies.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    },
  );

  return (
    <Segment title="All recipies">
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.recipies}>
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage();
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={css.more} key="loader">
                <Loader type="section" />
              </div>
            }
            getScrollParent={() => layoutContentElRef.current}
            useWindow={
              (layoutContentElRef.current &&
                getComputedStyle(layoutContentElRef.current).overflow) !==
              "auto"
            }
          >
            {data?.pages
              .flatMap((page) => page.recipies)
              .map((recipe) => (
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
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  );
};
