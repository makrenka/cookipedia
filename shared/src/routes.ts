import { pgr } from "./utils/pumpGetRoute.js";

export const getSignUpRoute = pgr(() => "/sign-up");

export const getSignInRoute = pgr(() => "/sign-in");

export const getSignOutRoute = pgr(() => "/sign-out");

export const getEditProfileRoute = pgr(() => "/edit-profile");

export const getAllRecipiesRoute = pgr(() => "/");

export const getViewRecipeRoute = pgr(
  { recipeNick: true },
  ({ recipeNick }) => `/recipies/${recipeNick}`,
);

export const getEditRecipeRoute = pgr(
  { recipeNick: true },
  ({ recipeNick }) => `/recipies/${recipeNick}/edit`,
);

export const getNewRecipeRoute = pgr(() => "/recipies/new");
