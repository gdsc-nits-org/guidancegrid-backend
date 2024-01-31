/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "jwtTokenVersion" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "password" TEXT NOT NULL;
