/*
  Warnings:

  - Added the required column `eventId` to the `Sponsorlevel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sponsorlevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "sellPrice" DECIMAL,
    "description" TEXT,
    "eventId" INTEGER NOT NULL,
    CONSTRAINT "Sponsorlevel_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sponsorlevel" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Sponsorlevel";
DROP TABLE "Sponsorlevel";
ALTER TABLE "new_Sponsorlevel" RENAME TO "Sponsorlevel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
