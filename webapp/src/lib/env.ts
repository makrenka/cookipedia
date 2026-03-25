import { zEnvNonemptyTrimmed } from "@cookipedia/shared/src/zod";
import z from "zod";

export const zEnv = z.object({
  VITE_BACKEND_TRPC_URL: zEnvNonemptyTrimmed,
  VITE_WEBAPP_URL: zEnvNonemptyTrimmed,
});

export const env = zEnv.parse(process.env);
