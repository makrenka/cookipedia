import { z } from "zod";
import { zStringRequired } from "@cookipedia/shared/zod";

export const zSignInTrpcInput = z.object({
  nick: zStringRequired,
  password: zStringRequired,
});
