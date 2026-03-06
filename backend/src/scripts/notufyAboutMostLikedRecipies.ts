import { type Recipe } from "@prisma/client";
import { AppContext } from "../lib/ctx";
import { sendMostLikedRecipiesEmail } from "../lib/emails";

export const notufyAboutMostLikedRecipies = async (ctx: AppContext) => {
  const mostLikedRecipies = await ctx.prisma.$queryRaw<
    Array<
      Pick<Recipe, "id" | "nick" | "name"> & { thisMonthLikesCount: number }
    >
  >`
        with "topRecipies" as (select id, nick, name, (
                select count(*)::int
                from "RecipeLike" rl 
                where rl."recipeId" = r.id 
                    and rl."createdAt" > now() - interval '1 month'
            ) as "thisMonthLikesCount" from "Recipe" r
            where r."blockedAt" is null
            order by "thisMonthLikesCount" desc 
            limit 10
        )
        select * from "topRecipies"
        where "thisMonthLikesCount" > 0
    `;

  if (!mostLikedRecipies.length) {
    return;
  }

  const users = await ctx.prisma.user.findMany({
    select: {
      email: true,
    },
  });

  //   await Promise.all(
  //     users.map(async (user) => {
  //       await sendMostLikedRecipiesEmail({ user, recipies: mostLikedRecipies });
  //     }),
  //   );
  for (const user of users) {
    await sendMostLikedRecipiesEmail({ user, recipies: mostLikedRecipies });
  }
};
