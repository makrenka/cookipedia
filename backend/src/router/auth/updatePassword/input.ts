import { zStringRequired } from "@cookipedia/shared/zod";
import { z } from "zod";

export const zUpdatePasswordTrpcInput = z.object({
  oldPassword: zStringRequired,
  newPassword: zStringRequired,
});
