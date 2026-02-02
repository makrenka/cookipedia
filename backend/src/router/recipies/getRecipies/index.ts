import { trpc } from "../../../lib/trpc";
import { zGetRecipiesTrpcInput } from "./input";

export const getRecipiesTrpcRoute = trpc.procedure
  .input(zGetRecipiesTrpcInput)
  .query(async ({ ctx, input }) => {
    const recipies = await ctx.prisma.recipe.findMany({
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
        serialNumber: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          serialNumber: "desc",
        },
      ],
      cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
      take: input.limit + 1,
    });

    const nextRecipe = recipies.at(input.limit);
    const nextCursor = nextRecipe?.serialNumber;
    const recipiesExceptNext = recipies.slice(0, input.limit);

    return { recipies: recipiesExceptNext, nextCursor };
  });
