/*
  Warnings:

  - Added the required column `subject` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "species" TEXT;

-- CreateTable
CREATE TABLE "Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "trigger" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Notification" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Notification";
DROP TABLE "Notification";
ALTER TABLE "new_Notification" RENAME TO "Notification";
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT false,
    "included" BOOLEAN NOT NULL DEFAULT false,
    "isClubMemberOnly" BOOLEAN NOT NULL DEFAULT false,
    "isClubMemberFree" BOOLEAN NOT NULL DEFAULT false,
    "preselected" BOOLEAN NOT NULL DEFAULT false,
    "mandatory" BOOLEAN NOT NULL DEFAULT false,
    "sellPrice" DECIMAL NOT NULL DEFAULT 0,
    "availableEndDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oneOfGroup" TEXT,
    "amountAvailable" INTEGER,
    "limit" INTEGER,
    "imageId" INTEGER NOT NULL,
    CONSTRAINT "Item_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("amountAvailable", "createdAt", "description", "eventId", "id", "isAvailable", "limit", "name", "sellPrice", "updatedAt") SELECT "amountAvailable", "createdAt", "description", "eventId", "id", "isAvailable", "limit", "name", "sellPrice", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_imageId_key" ON "Item"("imageId");
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isRegistrationOpen" BOOLEAN NOT NULL DEFAULT false,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "registrationStartDate" DATETIME,
    "registrationEndDate" DATETIME,
    "ticketLimit" INTEGER,
    "sellPrice" DECIMAL NOT NULL DEFAULT 0,
    "description" TEXT,
    "public" BOOLEAN,
    "telegram" TEXT,
    "signoff" BOOLEAN NOT NULL DEFAULT false,
    "signoffEndDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minimumAge" INTEGER,
    "paymentDue" INTEGER,
    "bankaccountIBAN" TEXT,
    "bankaccountBIC" TEXT,
    "bankaccountHolder" TEXT,
    "bankaccountAddress" TEXT,
    "street" TEXT,
    "zip" TEXT,
    "city" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "country" TEXT,
    "imageId" INTEGER NOT NULL,
    CONSTRAINT "Event_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_imageId_key" ON "Event"("imageId");
CREATE TABLE "new_Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,
    CONSTRAINT "Group_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Group_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("createdAt", "eventId", "id", "updatedAt") SELECT "createdAt", "eventId", "id", "updatedAt" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
CREATE UNIQUE INDEX "Group_imageId_key" ON "Group"("imageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
