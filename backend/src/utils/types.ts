import { User } from "@prisma/client";
import { Request } from "express";

export type ExpressRequest = Request & {
  user: User | undefined;
};
