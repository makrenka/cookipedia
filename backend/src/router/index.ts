import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { trpc } from "../lib/trpc";
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createRecipeTrpcRoute } from "./createRecipe";
import { getMeTrpcRoute } from "./getMe";
import { getRecipeTrpcRoute } from "./getRecipe";
import { getRecipiesTrpcRoute } from "./getRecipies";
import { signInTrpcRoute } from "./signIn";
import { signUpTrpcRoute } from "./signUp";
import { updateRecipeTrpcRoute } from "./updateRecipe";
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createRecipe: createRecipeTrpcRoute,
  getMe: getMeTrpcRoute,
  getRecipe: getRecipeTrpcRoute,
  getRecipies: getRecipiesTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateRecipe: updateRecipeTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
