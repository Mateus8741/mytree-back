/*
  Warnings:

  - You are about to drop the column `content` on the `Content` table. All the data in the column will be lost.
  - Added the required column `contentName` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "content",
ADD COLUMN     "contentName" TEXT NOT NULL;
