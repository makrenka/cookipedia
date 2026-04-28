import { trpcLoggedProcedure } from "../../../lib/trpc";
import _ from "lodash";
import { zGetRecipeTrpcInput } from "./input";
import { ExpectedError } from "../../../lib/error";

export const getRecipeTrpcRoute = trpcLoggedProcedure
  .input(zGetRecipeTrpcInput)
  .query(async ({ ctx, input }) => {
    const rawRecipe = await ctx.prisma.recipe.findUnique({
      where: {
        nick: input.recipeNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
            name: true,
          },
        },
        recipiesLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id,
          },
        },
        _count: {
          select: {
            recipiesLikes: true,
          },
        },
      },
    });

    if (rawRecipe?.blockedAt) {
      throw new ExpectedError("Recipe is blocked by administrator");
    }

    const isLikedByMe = !!rawRecipe?.recipiesLikes.length;
    const likesCount = rawRecipe?._count.recipiesLikes || 0;
    const recipe = rawRecipe && {
      ..._.omit(rawRecipe, ["recipiesLikes", "_count"]),
      isLikedByMe,
      likesCount,
    };

    return { recipe };
  });
