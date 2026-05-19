import { zStringRequired } from "@cookipedia/shared/zod";
import { zCreateRecipeTrpcInput } from "../createRecipe/input";

export const zUpdateRecipeTrpcInput = zCreateRecipeTrpcInput.extend({
  recipeId: zStringRequired,
});
