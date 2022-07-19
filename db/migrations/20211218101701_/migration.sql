/*
  Warnings:

  - You are about to alter the column `sellPrice` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `sellPrice` on the `Sponsorlevel` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `sellPrice` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `discount` on the `Registration` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `paidAmount` on the `Registration` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "isAvailable" BOOLEAN DEFAULT false,
    "included" BOOLEAN DEFAULT false,
    "isClubMemberOnly" BOOLEAN DEFAULT false,
    "isClubMemberFree" BOOLEAN DEFAULT false,
    "preselected" BOOLEAN DEFAULT false,
    "mandatory" BOOLEAN DEFAULT false,
    "sellPrice" REAL DEFAULT 0,
    "availableEndDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "oneOfGroup" TEXT,
    "amountAvailable" INTEGER,
    "limit" INTEGER,
    "eventId" INTEGER,
    "imageId" INTEGER,
    CONSTRAINT "Item_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("amountAvailable", "availableEndDate", "createdAt", "description", "eventId", "id", "imageId", "included", "isAvailable", "isClubMemberFree", "isClubMemberOnly", "limit", "mandatory", "name", "oneOfGroup", "preselected", "sellPrice", "updatedAt") SELECT "amountAvailable", "availableEndDate", "createdAt", "description", "eventId", "id", "imageId", "included", "isAvailable", "isClubMemberFree", "isClubMemberOnly", "limit", "mandatory", "name", "oneOfGroup", "preselected", "sellPrice", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_imageId_key" ON "Item"("imageId");
CREATE TABLE "new_Sponsorlevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "sellPrice" REAL,
    "description" TEXT,
    "eventId" INTEGER NOT NULL,
    CONSTRAINT "Sponsorlevel_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sponsorlevel" ("createdAt", "description", "eventId", "id", "name", "sellPrice", "updatedAt") SELECT "createdAt", "description", "eventId", "id", "name", "sellPrice", "updatedAt" FROM "Sponsorlevel";
DROP TABLE "Sponsorlevel";
ALTER TABLE "new_Sponsorlevel" RENAME TO "Sponsorlevel";
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
    "sellPrice" REAL NOT NULL DEFAULT 0,
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
    "imageId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Event_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("bankaccountAddress", "bankaccountBIC", "bankaccountHolder", "bankaccountIBAN", "city", "country", "createdAt", "description", "endDate", "id", "imageId", "isRegistrationOpen", "latitude", "longitude", "minimumAge", "name", "paymentDue", "public", "registrationEndDate", "registrationStartDate", "sellPrice", "signoff", "signoffEndDate", "slug", "startDate", "street", "telegram", "ticketLimit", "updatedAt", "userId", "zip") SELECT "bankaccountAddress", "bankaccountBIC", "bankaccountHolder", "bankaccountIBAN", "city", "country", "createdAt", "description", "endDate", "id", "imageId", "isRegistrationOpen", "latitude", "longitude", "minimumAge", "name", "paymentDue", "public", "registrationEndDate", "registrationStartDate", "sellPrice", "signoff", "signoffEndDate", "slug", "startDate", "street", "telegram", "ticketLimit", "updatedAt", "userId", "zip" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_imageId_key" ON "Event"("imageId");
CREATE TABLE "new_Registration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "paid" DATETIME,
    "donation" REAL,
    "isVisible" BOOLEAN,
    "attendeeStatus" TEXT NOT NULL,
    "comment" TEXT,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "paymentMethod" TEXT,
    "paidAmount" REAL,
    "paymentStatus" TEXT NOT NULL,
    "discount" REAL,
    "attended" DATETIME,
    "accepted" DATETIME,
    "waiting" DATETIME,
    "bookedin" DATETIME,
    "signedoff" DATETIME,
    CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Registration" ("accepted", "attended", "attendeeStatus", "bookedin", "comment", "createdAt", "discount", "donation", "eventId", "id", "isVisible", "paid", "paidAmount", "paymentMethod", "paymentStatus", "signedoff", "updatedAt", "userId", "waiting") SELECT "accepted", "attended", "attendeeStatus", "bookedin", "comment", "createdAt", "discount", "donation", "eventId", "id", "isVisible", "paid", "paidAmount", "paymentMethod", "paymentStatus", "signedoff", "updatedAt", "userId", "waiting" FROM "Registration";
DROP TABLE "Registration";
ALTER TABLE "new_Registration" RENAME TO "Registration";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
