export const App = () => {
  const recipies = [
    {
      name: "Recipe 2",
      description: "Recipe 2 description...",
      nick: "cool-recipe1",
    },
    {
      name: "Recipe 1",
      description: "Recipe 1 description...",
      nick: "cool-recipe2",
    },
    {
      name: "Recipe 3",
      description: "Recipe 3 description...",
      nick: "cool-recipe3",
    },
    {
      name: "Recipe 4",
      description: "Recipe 4 description...",
      nick: "cool-recipe4",
    },
    {
      name: "Recipe 5",
      description: "Recipe 5 description...",
      nick: "cool-recipe5",
    },
  ];

  return (
    <div>
      <h1>Cookipedia</h1>
      {recipies.map((recipe) => {
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
