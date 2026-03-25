import { zStringRequired } from "@cookipedia/shared/src/zod";
import { zCreateRecipeTrpcInput } from "../createRecipe/input";

export const zUpdateRecipeTrpcInput = zCreateRecipeTrpcInput.extend({
  recipeId: zStringRequired,
});
