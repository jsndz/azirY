/*
  Warnings:

  - You are about to drop the column `INRWalletId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "INRWallet" DROP CONSTRAINT "INRWallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "SolWallet" DROP CONSTRAINT "SolWallet_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "INRWalletId";

-- AddForeignKey
ALTER TABLE "INRWallet" ADD CONSTRAINT "INRWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolWallet" ADD CONSTRAINT "SolWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
