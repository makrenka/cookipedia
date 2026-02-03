import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { useDebounceValue } from "usehooks-ts";
import { trpc } from "../../../lib/trpc";
import { getViewRecipeRoute } from "../../../lib/routes";
import css from "./index.module.scss";
import { Segment } from "../../../components/Segment";
import { Alert } from "../../../components/Alert";
import { layoutContentElRef } from "../../../components/Layout";
import { Loader } from "../../../components/Loader";
import { useForm } from "../../../lib/form";
import { zGetRecipiesTrpcInput } from "@cookipedia/backend/src/router/recipies/getRecipies/input";
import { Input } from "../../../components/Input";

export const AllRecipiesPage = () => {
  const { formik } = useForm({
    initialValues: { search: "" },
    validationSchema: zGetRecipiesTrpcInput.pick({ search: true }),
  });
  const [search] = useDebounceValue(formik.values.search, 1000);
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
      search,
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    },
  );

  return (
    <Segment title="All recipies">
      <div className={css.filter}>
        <Input maxWidth={"100%"} label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data?.pages[0].recipies.length ? (
        <Alert color="brown">Nothing found by search</Alert>
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
                  >
                    Likes: {recipe.likesCount}
                  </Segment>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  );
};
