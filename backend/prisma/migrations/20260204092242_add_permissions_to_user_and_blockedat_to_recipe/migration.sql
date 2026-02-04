-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('BLOCK_RECIPIES', 'ALL');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "blockedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermission"[];
