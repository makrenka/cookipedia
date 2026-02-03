import z from "zod";

export const zSetRecipeLikeTrpcInput = z.object({
  recipeId: z.string().min(1),
  isLikedByMe: z.boolean(),
});
