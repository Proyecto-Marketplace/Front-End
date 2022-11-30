-- CreateEnum
CREATE TYPE "Status" AS ENUM ('online', 'offline');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'offline';
