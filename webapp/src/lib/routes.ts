export const getAllRecipiesRoute = () => "/";
export const getViewRecipeRoute = ({ recipeNick }: { recipeNick: string }) =>
  `/recipies/${recipeNick}`;
