import z from "zod";

export const zBlockRecipeTrpcInput = z.object({
  recipeId: z.string().min(1),
});
