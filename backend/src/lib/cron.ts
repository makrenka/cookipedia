import { CronJob } from "cron";
import { AppContext } from "./ctx";
import { notufyAboutMostLikedRecipies } from "../scripts/notufyAboutMostLikedRecipies";

export const applyCron = (ctx: AppContext) => {
  notufyAboutMostLikedRecipies(ctx).catch(console.error);
  new CronJob(
    "0 10 1 * *", // At 10:00 on day-of-month 1
    () => {
      notufyAboutMostLikedRecipies(ctx).catch(console.error);
    },
    null, // onComplete
    true, // start right now
  );
};
