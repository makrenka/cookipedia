import z from "zod";
import { recipies } from "../../lib/recipies";
import { trpc } from "../../lib/trpc";

export const getRecipeTrpcRoute = trpc.procedure
  .input(
    z.object({
      recipeNick: z.string(),
    })
  )
  .query(({ input }) => {
    const recipe = recipies.find((recipe) => recipe.nick === input.recipeNick);
    return { recipe: recipe || null };
  });
