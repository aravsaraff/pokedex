/*
  Warnings:

  - You are about to drop the column `type` on the `Pokemon` table. All the data in the column will be lost.
  - Made the column `sprite` on table `Pokemon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "type",
ADD COLUMN     "types" TEXT[],
ALTER COLUMN "sprite" SET NOT NULL;
