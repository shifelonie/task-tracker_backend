/*
  Warnings:

  - Made the column `name` on table `pic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pic" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "name" SET NOT NULL;
