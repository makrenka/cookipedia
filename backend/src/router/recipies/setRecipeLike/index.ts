import { trpcLoggedProcedure } from "../../../lib/trpc";
import { zSetRecipeLikeTrpcInput } from "./input";

export const setRecipeLikeTrpcRoute = trpcLoggedProcedure
  .input(zSetRecipeLikeTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { recipeId, isLikedByMe } = input;

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

    if (isLikedByMe) {
      await ctx.prisma.recipeLike.upsert({
        where: {
          recipeId_userId: {
            recipeId,
            userId: ctx.me.id,
          },
        },
        create: {
          userId: ctx.me.id,
          recipeId,
        },
        update: {},
      });
    } else {
      await ctx.prisma.recipeLike.delete({
        where: {
          recipeId_userId: {
            recipeId,
            userId: ctx.me.id,
          },
        },
      });
    }

    const likesCount = await ctx.prisma.recipeLike.count({
      where: {
        recipeId,
      },
    });

    return {
      recipe: {
        id: recipe.id,
        likesCount,
        isLikedByMe,
      },
    };
  });
