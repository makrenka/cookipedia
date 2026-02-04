import _ from "lodash";
import { trpc } from "../../../lib/trpc";
import { zGetRecipiesTrpcInput } from "./input";

export const getRecipiesTrpcRoute = trpc.procedure
  .input(zGetRecipiesTrpcInput)
  .query(async ({ ctx, input }) => {
    // const normalizedSearch = input.search
    //   ? input.search.trim().replace(/[\s\n\t]/g, "&")
    //   : undefined;
    const rawRecipies = await ctx.prisma.recipe.findMany({
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
        serialNumber: true,
        _count: {
          select: {
            recipiesLikes: true,
          },
        },
      },
      where: {
        blockedAt: null,
        ...(!input.search
          ? {}
          : {
              OR: [
                {
                  name: {
                    contains: input.search,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: input.search,
                    mode: "insensitive",
                  },
                },
                {
                  text: {
                    contains: input.search,
                    mode: "insensitive",
                  },
                },
              ],
            }),
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

    const nextRecipe = rawRecipies.at(input.limit);
    const nextCursor = nextRecipe?.serialNumber;
    const rawRecipiesExceptNext = rawRecipies.slice(0, input.limit);
    const recipiesExceptNext = rawRecipiesExceptNext.map((recipe) => ({
      ..._.omit(recipe, ["_count"]),
      likesCount: recipe._count.recipiesLikes,
    }));

    return { recipies: recipiesExceptNext, nextCursor };
  });
