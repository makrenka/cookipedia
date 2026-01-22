import { trpc } from "../../lib/trpc";
import { zUpdateRecipeTrpcInput } from "./input";

export const updateRecipeTrpcRoute = trpc.procedure
  .input(zUpdateRecipeTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { recipeId, ...recipeInput } = input;

    if (!ctx.me) {
      throw new Error("UNAUTHORIZED");
    }

    const recipe = await ctx.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!recipe) {
      throw new Error("NOT_FOUND");
    }

    if (ctx.me.id !== recipe.authorId) {
      throw new Error("NOT_YOUR_RECIPE");
    }

    if (recipe.nick !== input.nick) {
      const exRecipe = await ctx.prisma.recipe.findUnique({
        where: {
          nick: input.nick,
        },
      });

      if (exRecipe) {
        throw new Error("Recipe with this nick already exists");
      }
    }

    await ctx.prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        ...recipeInput,
      },
    });

    return true;
  });
