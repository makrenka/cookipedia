import { recipies } from "../../lib/recipies";
import { trpc } from "../../lib/trpc";
import { zCreateRecipeTrpcInput } from "./input";

export const createRecipeTrpcRoute = trpc.procedure
  .input(zCreateRecipeTrpcInput)
  .mutation(({ input }) => {
    if(recipies.find((recipe) => recipe.nick === input.nick)) {
      throw Error("Recipe with this nick already exists")
    }
    recipies.unshift(input);
    return true;
  });
