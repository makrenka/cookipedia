import {
  appContext,
  createRecipeLike,
  createRecipeWithAuthor,
  withoutNoize,
} from "../test/integration";
import { startOfMonth, sub } from "date-fns";
import { sendEmail } from "../lib/emails/utils";
import {
  getMostLikedRecipies,
  notifyAboutMostLikedRecipies,
} from "./notufyAboutMostLikedRecipies";

const createData = async (now: Date) => {
  // has 3 likes in prev month
  const { recipe: recipe1, author: author1 } = await createRecipeWithAuthor({
    number: 1,
  });

  // has 2 like in prev month, and 2 like in prev prev month
  const { recipe: recipe2, author: author2 } = await createRecipeWithAuthor({
    number: 2,
  });

  // has 1 like in prev month, and 1 like in prev prev month
  const { recipe: recipe3, author: author3 } = await createRecipeWithAuthor({
    number: 3,
  });

  // has 3 likes in prev prev month
  const { recipe: recipe4, author: author4 } = await createRecipeWithAuthor({
    number: 4,
  });

  // has no likes
  await createRecipeWithAuthor({ number: 5 });

  const prevMonthDate = sub(now, {
    days: 10,
  });
  const prevPrevMonthDate = sub(now, {
    days: 10,
    months: 1,
  });

  await createRecipeLike({
    recipe: recipe1,
    liker: author1,
    createdAt: prevMonthDate,
  });
  await createRecipeLike({
    recipe: recipe1,
    liker: author2,
    createdAt: prevMonthDate,
  });
  await createRecipeLike({
    recipe: recipe1,
    liker: author3,
    createdAt: prevMonthDate,
  });

  await createRecipeLike({
    recipe: recipe2,
    liker: author1,
    createdAt: prevMonthDate,
  });
  await createRecipeLike({
    recipe: recipe2,
    liker: author2,
    createdAt: prevMonthDate,
  });
  await createRecipeLike({
    recipe: recipe2,
    liker: author3,
    createdAt: prevPrevMonthDate,
  });
  await createRecipeLike({
    recipe: recipe2,
    liker: author4,
    createdAt: prevPrevMonthDate,
  });

  await createRecipeLike({
    recipe: recipe3,
    liker: author1,
    createdAt: prevMonthDate,
  });
  await createRecipeLike({
    recipe: recipe3,
    liker: author2,
    createdAt: prevPrevMonthDate,
  });

  await createRecipeLike({
    recipe: recipe4,
    liker: author1,
    createdAt: prevPrevMonthDate,
  });
  await createRecipeLike({
    recipe: recipe4,
    liker: author2,
    createdAt: prevPrevMonthDate,
  });
  await createRecipeLike({
    recipe: recipe4,
    liker: author3,
    createdAt: prevPrevMonthDate,
  });
};

describe("getMostLikedRecipies", () => {
  it("return most liked recipies of prev month", async () => {
    const now = startOfMonth(new Date());
    await createData(now);

    expect(
      withoutNoize(
        await getMostLikedRecipies(appContext, 2, now),
      ),
    ).toMatchInlineSnapshot(`
[
  {
    "name": "Idea 1",
    "nick": "idea1",
    "thisMonthLikesCount": 3,
  },
  {
    "name": "Idea 2",
    "nick": "idea2",
    "thisMonthLikesCount": 2,
  },
]
`);
    expect(
      withoutNoize(
        await getMostLikedRecipies(appContext, 2, now),
      ),
    ).toMatchInlineSnapshot(`
[
  {
    "name": "Idea 1",
    "nick": "idea1",
    "thisMonthLikesCount": 3,
  },
  {
    "name": "Idea 2",
    "nick": "idea2",
    "thisMonthLikesCount": 2,
  },
  {
    "name": "Idea 3",
    "nick": "idea3",
    "thisMonthLikesCount": 1,
  },
]
`);
  });
});

describe("notifyAboutMostLikedIdeas", () => {
  it("send list of ideas to users", async () => {
    const now = startOfMonth(new Date());
    await createData(now);
    await notifyAboutMostLikedRecipies({ ctx: appContext, limit: 2, now });
    expect(sendEmail).toHaveBeenCalledTimes(5);
    const calls = jest.mocked(sendEmail).mock.calls;
    const prettifiedCallProps = calls.map(([props]) => withoutNoize(props));
    expect(prettifiedCallProps).toMatchInlineSnapshot(`
      [
        {
          "subject": "Most Liked Ideas!",
          "templateName": "mostLikedIdeas",
          "templateVariables": {
            "ideas": [
              {
                "name": "Idea 1",
              },
              {
                "name": "Idea 2",
              },
            ],
          },
          "to": "user1@example.com",
        },
        {
          "subject": "Most Liked Ideas!",
          "templateName": "mostLikedIdeas",
          "templateVariables": {
            "ideas": [
              {
                "name": "Idea 1",
              },
              {
                "name": "Idea 2",
              },
            ],
          },
          "to": "user2@example.com",
        },
        {
          "subject": "Most Liked Ideas!",
          "templateName": "mostLikedIdeas",
          "templateVariables": {
            "ideas": [
              {
                "name": "Idea 1",
              },
              {
                "name": "Idea 2",
              },
            ],
          },
          "to": "user3@example.com",
        },
        {
          "subject": "Most Liked Ideas!",
          "templateName": "mostLikedIdeas",
          "templateVariables": {
            "ideas": [
              {
                "name": "Idea 1",
              },
              {
                "name": "Idea 2",
              },
            ],
          },
          "to": "user4@example.com",
        },
        {
          "subject": "Most Liked Ideas!",
          "templateName": "mostLikedIdeas",
          "templateVariables": {
            "ideas": [
              {
                "name": "Idea 1",
              },
              {
                "name": "Idea 2",
              },
            ],
          },
          "to": "user5@example.com",
        },
      ]
    `);
  });
});
