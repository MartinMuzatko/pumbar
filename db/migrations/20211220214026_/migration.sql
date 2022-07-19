/*
  Warnings:

  - Made the column `name` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Sponsorlevel` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
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
    "name" TEXT NOT NULL,
    "sellPrice" REAL,
    "description" TEXT,
    "eventId" INTEGER NOT NULL,
    CONSTRAINT "Sponsorlevel_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sponsorlevel" ("createdAt", "description", "eventId", "id", "name", "sellPrice", "updatedAt") SELECT "createdAt", "description", "eventId", "id", "name", "sellPrice", "updatedAt" FROM "Sponsorlevel";
DROP TABLE "Sponsorlevel";
ALTER TABLE "new_Sponsorlevel" RENAME TO "Sponsorlevel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
