const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce(
    (acc, key) => ({ ...acc, [key]: `:${key}` }),
    {}
  ) as Record<keyof T, string>;
};

export const getAllRecipiesRoute = () => "/";

export type ViewRecipeRouteParams = typeof viewRecipeRouteParams;

export const viewRecipeRouteParams = getRouteParams({ recipeNick: true });
export const getViewRecipeRoute = ({ recipeNick }: ViewRecipeRouteParams) =>
  `/recipies/${recipeNick}`;

export const getNewRecipeRoute = () => "/recipies/new";

export const getSignUpRoute = () => "/sign-up";
