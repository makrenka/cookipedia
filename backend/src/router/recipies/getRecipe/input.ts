import { zStringRequired } from "@cookipedia/shared/src/zod";
import z from "zod";

export const zGetRecipeTrpcInput = z.object({
  recipeNick: zStringRequired,
});
