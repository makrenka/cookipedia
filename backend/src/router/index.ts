import { trpc } from "../lib/trpc";
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createRecipeTrpcRoute } from "./createRecipe";
import { getRecipeTrpcRoute } from "./getRecipe";
import { getRecipiesTrpcRoute } from "./getRecipies";
import { signInTrpcRoute } from "./signIn";
import { signUpTrpcRoute } from "./signUp";
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createRecipe: createRecipeTrpcRoute,
  getRecipe: getRecipeTrpcRoute,
  getRecipies: getRecipiesTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;
