import { Passport } from "passport";
import { Express } from "express";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { AppContext } from "./ctx";

export const applyPassportToExpressApp = (
  expressApp: Express,
  ctx: AppContext,
): void => {
  const passport = new Passport();

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: "not-really-secret-jwt-key",
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
      },
      (jwtPayload: string, done) => {
        ctx.prisma.user
          .findUnique({
            where: { id: jwtPayload },
          })
          .then((user) => {
            if (!user) {
              done(null, false);
              return;
            }
            done(null, user);
          })
          .catch((error) => {
            done(error, false);
          });
      },
    ),
  );

  expressApp.use((req, res, next) => {
    if (!req.headers.authorization) {
      next();
      return;
    }
    passport.authenticate(
      "jwt",
      { session: false },
      (
        ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
      ) => {
        req.user = args[1] || undefined;
        next();
      },
    )(req, res, next);
  });
};
