import {
  appContext,
  createRecipeWithAuthor,
  createUser,
  getTrpcCaller,
} from "../../../test/integration";

describe("setIdeaLike", () => {
  it("create like", async () => {
    const { recipe } = await createRecipeWithAuthor({ number: 1 });
    const liker = await createUser({ number: 2 });
    const trpcCallerForLiker = getTrpcCaller(liker);
    const result = await trpcCallerForLiker.setRecipeLike({
      recipeId: recipe.id,
      isLikedByMe: true,
    });
    expect(result).toMatchObject({
      recipe: {
        isLikedByMe: true,
        likesCount: 1,
      },
    });
    const recipeLikes = await appContext.prisma.recipeLike.findMany();
    expect(recipeLikes).toHaveLength(1);
    expect(recipeLikes[0]).toMatchObject({
      recipeId: recipe.id,
      userId: liker.id,
    });
  });

  it("remove like", async () => {
    const { recipe } = await createRecipeWithAuthor({ number: 1 });
    const liker = await createUser({ number: 2 });
    const trpcCallerForLiker = getTrpcCaller(liker);
    const result1 = await trpcCallerForLiker.setRecipeLike({
      recipeId: recipe.id,
      isLikedByMe: true,
    });
    expect(result1).toMatchObject({
      recipe: {
        isLikedByMe: true,
        likesCount: 1,
      },
    });
    const result2 = await trpcCallerForLiker.setRecipeLike({
      recipeId: recipe.id,
      isLikedByMe: false,
    });
    expect(result2).toMatchObject({
      recipe: {
        isLikedByMe: false,
        likesCount: 0,
      },
    });
    const ideaLikes = await appContext.prisma.recipeLike.findMany();
    expect(ideaLikes).toHaveLength(0);
  });
});
