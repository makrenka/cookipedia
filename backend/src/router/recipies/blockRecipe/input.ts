import { zStringRequired } from "@cookipedia/shared/zod";
import { z } from "zod";

export const zBlockRecipeTrpcInput = z.object({
  recipeId: zStringRequired,
});
