import { zStringOptional } from "@cookipedia/shared/zod";
import { z } from "zod";

export const zGetRecipiesTrpcInput = z.object({
  cursor: z.coerce.number().optional(),
  limit: z.number().min(1).max(100).default(10),
  search: zStringOptional,
});
