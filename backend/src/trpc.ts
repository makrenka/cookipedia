import { initTRPC } from "@trpc/server";

const recipies = [
  {
    name: "Recipe 2",
    description: "Recipe 2 description...",
    nick: "cool-recipe1",
  },
  {
    name: "Recipe 1",
    description: "Recipe 1 description...",
    nick: "cool-recipe2",
  },
  {
    name: "Recipe 3",
    description: "Recipe 3 description...",
    nick: "cool-recipe3",
  },
  {
    name: "Recipe 4",
    description: "Recipe 4 description...",
    nick: "cool-recipe4",
  },
  {
    name: "Recipe 5",
    description: "Recipe 5 description...",
    nick: "cool-recipe5",
  },
];

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getRecipies: trpc.procedure.query(() => {
    return { recipies };
  }),
});

export type TrpcRouter = typeof trpcRouter;
