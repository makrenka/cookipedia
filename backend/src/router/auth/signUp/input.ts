import {
  zEmailRequired,
  zNickRequired,
  zStringRequired,
} from "@cookipedia/shared/zod";
import { z } from "zod";

export const zSignUpTrpcInput = z.object({
  nick: zNickRequired,
  email: zEmailRequired,
  password: zStringRequired,
});
