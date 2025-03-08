/*
  Warnings:

  - Made the column `folderId` on table `Note` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "folderId" SET NOT NULL;
