import _ from "lodash";
import { recipies } from "../../lib/recipies";
import { trpc } from "../../lib/trpc";

export const getRecipiesTrpcRoute = trpc.procedure.query(() => {
  return {
    recipies: recipies.map((recipe) =>
      _.pick(recipe, ["nick", "name", "description"])
    ),
  };
});
