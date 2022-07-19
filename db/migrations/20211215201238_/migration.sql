/*
  Warnings:

  - You are about to drop the column `author` on the `Document` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "description" TEXT,
    "authorId" INTEGER,
    "showTitle" BOOLEAN,
    "pageModules" TEXT,
    "slugLocked" BOOLEAN,
    "eventId" INTEGER,
    "parentId" INTEGER,
    CONSTRAINT "Document_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Document_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Document_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Document" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("createdAt", "description", "eventId", "id", "pageModules", "parentId", "showTitle", "slug", "slugLocked", "title", "updatedAt") SELECT "createdAt", "description", "eventId", "id", "pageModules", "parentId", "showTitle", "slug", "slugLocked", "title", "updatedAt" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
CREATE UNIQUE INDEX "Document_eventId_key" ON "Document"("eventId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
