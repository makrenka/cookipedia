import { initTRPC } from "@trpc/server";
import _ from "lodash";
import { z } from "zod";

const recipies = _.times(100, (i) => ({
  name: `Recipe ${i}`,
  description: `Recipe ${i} description...`,
  nick: `cool-recipe${i}`,
  text: _.times(
    100,
    (j) => `<p>Text paragraph ${j} of recipe ${i}...</p>`
  ).join(""),
}));

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getRecipies: trpc.procedure.query(() => {
    return {
      recipies: recipies.map((recipe) =>
        _.pick(recipe, ["nick", "name", "description"])
      ),
    };
  }),
  getRecipe: trpc.procedure
    .input(
      z.object({
        recipeNick: z.string(),
      })
    )
    .query(({ input }) => {
      const recipe = recipies.find(
        (recipe) => recipe.nick === input.recipeNick
      );
      return { recipe: recipe || null };
    }),
});

export type TrpcRouter = typeof trpcRouter;
