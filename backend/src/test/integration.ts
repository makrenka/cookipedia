import { type Recipe, type User } from "@prisma/client";
import _, { omit } from "lodash";
import { createAppContext } from "../lib/ctx";
import { getTrpcContext } from "../lib/trpc";
import { trpcRouter } from "../router";
import { deepMap } from "../utils/deepMap";
import { getPasswordHash } from "../utils/getPasswordHash";
import { type ExpressRequest } from "../utils/types";
import { env } from "../lib/env";

if (env.NODE_ENV !== "test") {
  throw new Error("Run integration tests only with NODE_ENV=test");
}

export const appContext = createAppContext();

afterAll(appContext.stop);

beforeEach(async () => {
  await appContext.prisma.recipeLike.deleteMany();
  await appContext.prisma.recipe.deleteMany();
  await appContext.prisma.user.deleteMany();
});

export const getTrpcCaller = (user?: User) => {
  const req = { user } as ExpressRequest;
  return trpcRouter.createCaller(getTrpcContext({ appContext, req }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withoutNoize = (input: any): any => {
  return deepMap(input, ({ value }) => {
    if (_.isObject(value) && !_.isArray(value)) {
      return _.entries(value).reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc, [objectKey, objectValue]: [string, any]) => {
          if (
            [/^id$/, /Id$/, /At$/, /^url$/].some((regex) =>
              regex.test(objectKey),
            )
          ) {
            return acc;
          }
          return {
            ...acc,
            [objectKey]: objectValue,
          };
        },
        {},
      );
    }
    return value;
  });
};

export const createUser = async ({
  user = {},
  number = 1,
}: { user?: Partial<User>; number?: number } = {}) => {
  return await appContext.prisma.user.create({
    data: {
      nick: `user${number}`,
      email: `user${number}@example.com`,
      password: getPasswordHash(user.password || "1234"),
      ...omit(user, ["password"]),
    },
  });
};

export const createRecipe = async ({
  recipe = {},
  author,
  number = 1,
}: {
  recipe?: Partial<Recipe>;
  author: Pick<User, "id">;
  number?: number;
}) => {
  return await appContext.prisma.recipe.create({
    data: {
      nick: `idea${number}`,
      authorId: author.id,
      name: `Idea ${number}`,
      description: `Idea ${number} description`,
      text: `Idea ${number} text text text text text text text text text text text text text text text text text text text text text`,
      ...recipe,
    },
  });
};

export const createRecipeWithAuthor = async ({
  author,
  recipe,
  number,
}: {
  author?: Partial<User>;
  recipe?: Partial<Recipe>;
  number?: number;
} = {}) => {
  const createdUser = await createUser({ user: author, number });
  const createdRecipe = await createRecipe({
    recipe,
    author: createdUser,
    number,
  });
  return {
    author: createdUser,
    recipe: createdRecipe,
  };
};

export const createRecipeLike = async ({
  recipe,
  liker,
  createdAt,
}: {
  recipe: Pick<Recipe, "id">;
  liker: Pick<User, "id">;
  createdAt?: Date;
}) => {
  return await appContext.prisma.recipeLike.create({
    data: {
      recipeId: recipe.id,
      userId: liker.id,
      createdAt,
    },
  });
};
