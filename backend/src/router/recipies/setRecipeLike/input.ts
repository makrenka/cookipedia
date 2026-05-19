import { zStringRequired } from "@cookipedia/shared/zod";
import { z } from "zod";

export const zSetRecipeLikeTrpcInput = z.object({
  recipeId: zStringRequired,
  isLikedByMe: z.boolean(),
});
