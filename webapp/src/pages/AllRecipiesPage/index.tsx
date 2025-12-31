import { trpc } from "../../lib/trpc";

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
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </div>
        );
      })}
    </div>
  );
};
