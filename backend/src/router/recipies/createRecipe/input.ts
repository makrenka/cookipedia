import {
  zNickRequired,
  zStringMin,
  zStringRequired,
} from "@cookipedia/shared/zod";
import { z } from "zod";

export const zCreateRecipeTrpcInput = z.object({
  name: zStringRequired,
  nick: zNickRequired,
  description: zStringRequired,
  text: zStringMin(100),
});
