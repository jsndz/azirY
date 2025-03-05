/*
  Warnings:

  - You are about to drop the column `inrWalletId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `InrWalet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InrWalet" DROP CONSTRAINT "InrWalet_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "inrWalletId",
DROP COLUMN "profilePicture",
ADD COLUMN     "INRWalletId" TEXT,
ADD COLUMN     "profilePic" TEXT;

-- DropTable
DROP TABLE "InrWalet";

-- CreateTable
CREATE TABLE "INRWallet" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "INRWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "INRWallet_userId_key" ON "INRWallet"("userId");

-- AddForeignKey
ALTER TABLE "INRWallet" ADD CONSTRAINT "INRWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
