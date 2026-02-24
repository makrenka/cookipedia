import _ from "lodash";
import path from "node:path";
import fg from "fast-glob";
import { promises as fs } from "fs";
import Handlebars from "handlebars";
import { env } from "./env";
import { Recipe, User } from "@prisma/client";
import { sendEmailThroughBrevo } from "./brevo";

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
    const { loggableResponse } = await sendEmailThroughBrevo({
      to,
      html,
      subject,
    });

    console.info("sendEmail", {
      to,
      templateName,
      fullTemplateVariables,
      response: loggableResponse,
    });
    return { ok: true };
  } catch (error) {
    console.error(error);
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
      addRecipeUrl: `${env.WEBAPP_URL}/recipies/new`,
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
