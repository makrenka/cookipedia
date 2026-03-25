import { zStringRequired } from "@cookipedia/shared/src/zod";
import z from "zod";

export const zSetRecipeLikeTrpcInput = z.object({
  recipeId: zStringRequired,
  isLikedByMe: z.boolean(),
});
