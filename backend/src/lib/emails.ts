import _ from "lodash";
import path from "node:path";
import fg from "fast-glob";
import { promises as fs } from "fs";
import Handlebars from "handlebars";
import {
  getNewRecipeRoute,
  getViewRecipeRoute,
} from "@cookipedia/shared/routes";
import { env } from "./env";
import { type Recipe, type User } from "@prisma/client";
// import { sendEmailThroughBrevo } from "./brevo";
import { sendEmailThroughResend } from "./resend";
import { logger } from "./logger";

const getHbrTemplates = _.memoize(async () => {
  const htmlPathsPattern = path
    .join(process.cwd(), "src/emails/dist/**/*.html")
    .replace(/\\/g, "/");
  const htmlPaths = fg.sync(htmlPathsPattern, { absolute: true });
  const hbrTemplates: Record<string, HandlebarsTemplateDelegate> = {};

  for (const htmlPath of htmlPaths) {
    const templateName = path.basename(htmlPath, ".html");
    const htmlTemplate = await fs.readFile(htmlPath, "utf8");
    hbrTemplates[templateName] = Handlebars.compile(htmlTemplate);
  }

  return hbrTemplates;
});

const getEmailHtml = async (
  templateName: string,
  templateVariables: Record<string, string> = {},
) => {
  const hbrTemplates = await getHbrTemplates();
  const hbrTemplate = hbrTemplates[templateName];
  const html = hbrTemplate(templateVariables);
  return html;
};

const sendEmail = async ({
  to,
  subject,
  templateName,
  templateVariables = {},
}: {
  to: string;
  subject: string;
  templateName: string;
  templateVariables?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}) => {
  try {
    const fullTemplateVariables = {
      ...templateVariables,
      homeUrl: env.WEBAPP_URL,
    };
    const html = await getEmailHtml(templateName, fullTemplateVariables);
    // const { loggableResponse } = await sendEmailThroughBrevo({
    //   to,
    //   html,
    //   subject,
    // });
    const { loggableResponse } = await sendEmailThroughResend({
      to,
      html,
      subject,
    });

    logger.info("email", "sendEmail", {
      to,
      templateName,
      fullTemplateVariables,
      response: loggableResponse,
    });
    return { ok: true };
  } catch (error) {
    logger.error("email", error);
    return { ok: false };
  }
};

export const sendWelcomeEmail = async ({
  user,
}: {
  user: Pick<User, "nick" | "email">;
}) => {
  return await sendEmail({
    to: user.email,
    subject: "Thanks For Registration!",
    templateName: "welcome",
    templateVariables: {
      userNick: user.nick,
      addRecipeUrl: `${getNewRecipeRoute({ abs: true })}`,
    },
  });
};

export const sendRecipeBlockedEmail = async ({
  user,
  recipe,
}: {
  user: Pick<User, "nick" | "email">;
  recipe: Pick<Recipe, "nick">;
}) => {
  return await sendEmail({
    to: user.email,
    subject: "Your Recipe Blocked!",
    templateName: "recipeBlocked",
    templateVariables: {
      recipeNick: recipe.nick,
    },
  });
};

export const sendMostLikedRecipiesEmail = async ({
  user,
  recipies,
}: {
  user: Pick<User, "email">;
  recipies: Array<Pick<Recipe, "nick" | "name">>;
}) => {
  return await sendEmail({
    to: user.email,
    subject: "Most liked recipies!",
    templateName: "mostLikedRecipies",
    templateVariables: {
      recipies: recipies.map((recipe) => ({
        name: recipe.name,
        url: getViewRecipeRoute({ abs: true, recipeNick: recipe.nick }),
      })),
    },
  });
};
