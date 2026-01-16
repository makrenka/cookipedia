import { trpc } from "../../lib/trpc";

export const getRecipiesTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const recipies = await ctx.prisma.recipe.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
    },
  });

  return { recipies };
});
