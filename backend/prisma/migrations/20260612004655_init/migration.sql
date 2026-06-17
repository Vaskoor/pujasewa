/*
  Warnings:

  - You are about to drop the column `isRead` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `body` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientPanditId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "address" TEXT,
ADD COLUMN     "altPhone" TEXT,
ADD COLUMN     "caste" TEXT,
ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "decorationId" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 120,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "panditCancelReason" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "religion" TEXT,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Decoration" ADD COLUMN     "emoji" TEXT,
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "isRead",
DROP COLUMN "message",
DROP COLUMN "userId",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "metadata" TEXT,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recipientPanditId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pandit" ADD COLUMN     "baseRate" INTEGER NOT NULL DEFAULT 2000,
ADD COLUMN     "caste" TEXT,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "religion" TEXT;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_decorationId_fkey" FOREIGN KEY ("decorationId") REFERENCES "Decoration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipientPanditId_fkey" FOREIGN KEY ("recipientPanditId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
