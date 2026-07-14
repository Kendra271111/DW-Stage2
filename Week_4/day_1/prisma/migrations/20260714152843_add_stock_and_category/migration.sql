-- CreateEnum
CREATE TYPE "category" AS ENUM ('Small', 'Medium', 'Large');

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "category" "category" NOT NULL DEFAULT 'Medium',
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;
