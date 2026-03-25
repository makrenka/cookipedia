import { zStringRequired } from "@cookipedia/shared/src/zod";
import z from "zod";

export const zUpdatePasswordTrpcInput = z.object({
  oldPassword: zStringRequired,
  newPassword: zStringRequired,
});
