import { sendRecipeBlockedEmail } from "../../../lib/emails";
import { trpcLoggedProcedure } from "../../../lib/trpc";
import { canBlockRecipies } from "../../../utils/can";
import { zBlockRecipeTrpcInput } from "./input";

export const blockRecipeTrpcRoute = trpcLoggedProcedure
  .input(zBlockRecipeTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { recipeId } = input;
    if (!canBlockRecipies(ctx.me)) {
      throw new Error("PERMISSION_DENIED");
    }

    const recipe = await ctx.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        author: true,
      },
    });

    if (!recipe) {
      throw new Error("NOT_FOUND");
    }

    await ctx.prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        blockedAt: new Date(),
      },
    });

    void sendRecipeBlockedEmail({ user: recipe.author, recipe });

    return true;
  });
