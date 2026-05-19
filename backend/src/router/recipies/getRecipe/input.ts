import { zStringRequired } from "@cookipedia/shared/zod";
import { z } from "zod";

export const zGetRecipeTrpcInput = z.object({
  recipeNick: zStringRequired,
});
