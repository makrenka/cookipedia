import z from "zod";
import { zCreateRecipeTrpcInput } from "../createRecipe/input";

export const zUpdateRecipeTrpcInput = zCreateRecipeTrpcInput.extend({
  recipeId: z.string().min(1),
});
