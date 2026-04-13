import { trpcLoggedProcedure } from "../../../lib/trpc";
import { zSignUpTrpcInput } from "./input";
import { getPasswordHash } from "../../../utils/getPasswordHash";
import { signJWT } from "../../../utils/signJWT";
import { sendWelcomeEmail } from "../../../lib/emails";

export const signUpTrpcRoute = trpcLoggedProcedure
  .input(zSignUpTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const exUserWithNick = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (exUserWithNick) {
      throw Error("Recipe with this nick already exists");
    }

    const exUserWithEmail = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (exUserWithEmail) {
      throw Error("Recipe with this email already exists");
    }

    const user = await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        email: input.email,
        password: getPasswordHash(input.password),
      },
    });

    void sendWelcomeEmail({ user });
    const token = signJWT(user.id);

    return { token };
  });
