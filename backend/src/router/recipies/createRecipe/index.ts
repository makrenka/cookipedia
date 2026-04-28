import { ExpectedError } from "../../../lib/error";
import { trpcLoggedProcedure } from "../../../lib/trpc";
import { zCreateRecipeTrpcInput } from "./input";

export const createRecipeTrpcRoute = trpcLoggedProcedure
  .input(zCreateRecipeTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw Error("Not authenticated");
    }
    const exRecipe = await ctx.prisma.recipe.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (exRecipe) {
      throw new ExpectedError("Recipe with this nick already exists");
    }

    await ctx.prisma.recipe.create({
      data: { ...input, authorId: ctx.me.id },
    });

    return true;
  });
