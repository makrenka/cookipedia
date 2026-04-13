import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { createTrpcRouter } from "../lib/trpc";
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getMeTrpcRoute } from "./auth/getMe";
import { signInTrpcRoute } from "./auth/signIn";
import { signUpTrpcRoute } from "./auth/signUp";
import { updatePasswordTrpcRoute } from "./auth/updatePassword";
import { updateProfileTrpcRoute } from "./auth/updateProfile";
import { blockRecipeTrpcRoute } from "./recipies/blockRecipe";
import { createRecipeTrpcRoute } from "./recipies/createRecipe";
import { getRecipeTrpcRoute } from "./recipies/getRecipe";
import { getRecipiesTrpcRoute } from "./recipies/getRecipies";
import { setRecipeLikeTrpcRoute } from "./recipies/setRecipeLike";
import { updateRecipeTrpcRoute } from "./recipies/updateRecipe";
// @endindex

export const trpcRouter = createTrpcRouter({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  blockRecipe: blockRecipeTrpcRoute,
  createRecipe: createRecipeTrpcRoute,
  getRecipe: getRecipeTrpcRoute,
  getRecipies: getRecipiesTrpcRoute,
  setRecipeLike: setRecipeLikeTrpcRoute,
  updateRecipe: updateRecipeTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
