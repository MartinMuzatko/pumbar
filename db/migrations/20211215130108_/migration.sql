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
    "sellPrice" DECIMAL DEFAULT 0,
    "availableEndDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "oneOfGroup" TEXT,
    "eventId" INTEGER,
    "amountAvailable" INTEGER,
    "limit" INTEGER,
    "imageId" INTEGER,
    CONSTRAINT "Item_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("amountAvailable", "availableEndDate", "createdAt", "description", "eventId", "id", "imageId", "included", "isAvailable", "isClubMemberFree", "isClubMemberOnly", "limit", "mandatory", "name", "oneOfGroup", "preselected", "sellPrice", "updatedAt") SELECT "amountAvailable", "availableEndDate", "createdAt", "description", "eventId", "id", "imageId", "included", "isAvailable", "isClubMemberFree", "isClubMemberOnly", "limit", "mandatory", "name", "oneOfGroup", "preselected", "sellPrice", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_imageId_key" ON "Item"("imageId");
CREATE TABLE "new_Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventId" INTEGER,
    "imageId" INTEGER,
    CONSTRAINT "Group_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Group_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("createdAt", "description", "eventId", "id", "imageId", "name", "updatedAt") SELECT "createdAt", "description", "eventId", "id", "imageId", "name", "updatedAt" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
CREATE UNIQUE INDEX "Group_imageId_key" ON "Group"("imageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
