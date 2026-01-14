/*
  Warnings:

  - You are about to drop the column `content` on the `Journal` table. All the data in the column will be lost.
  - Added the required column `journalContent` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "content",
ADD COLUMN     "journalContent" TEXT NOT NULL;
