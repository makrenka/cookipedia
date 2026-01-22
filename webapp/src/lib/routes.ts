const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce(
    (acc, key) => ({ ...acc, [key]: `:${key}` }),
    {},
  ) as Record<keyof T, string>;
};

export const getAllRecipiesRoute = () => "/";

export const viewRecipeRouteParams = getRouteParams({ recipeNick: true });
export type ViewRecipeRouteParams = typeof viewRecipeRouteParams;
export const getViewRecipeRoute = ({ recipeNick }: ViewRecipeRouteParams) =>
  `/recipies/${recipeNick}`;

export const editRecipeRouteParams = getRouteParams({ recipeNick: true });
export type EditRecipeRouteParams = typeof editRecipeRouteParams;
export const getEditRecipeRoute = ({ recipeNick }: EditRecipeRouteParams) =>
  `/recipies/${recipeNick}/edit`;

export const getNewRecipeRoute = () => "/recipies/new";

export const getSignUpRoute = () => "/sign-up";
export const getSignInRoute = () => "/sign-in";
export const getSignOutRoute = () => "/sign-out";
