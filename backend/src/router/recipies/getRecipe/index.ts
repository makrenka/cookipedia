import z from "zod";
import { trpc } from "../../../lib/trpc";

export const getRecipeTrpcRoute = trpc.procedure
  .input(
    z.object({
      recipeNick: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const recipe = await ctx.prisma.recipe.findUnique({
      where: {
        nick: input.recipeNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
          },
        },
      },
    });

    return { recipe };
  });
