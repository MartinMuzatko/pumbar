/*
  Warnings:

  - You are about to drop the column `fileId` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "species" TEXT,
    "speciesIcon" TEXT,
    "location" INTEGER,
    "telegram" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isSubscribedOfficial" BOOLEAN NOT NULL DEFAULT false,
    "isSubscribedPublic" BOOLEAN NOT NULL DEFAULT false,
    "website" TEXT,
    "birthday" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clubEntryDate" DATETIME,
    "clubFunction" TEXT,
    "clubMembershipType" TEXT,
    "clubMemberId" INTEGER,
    "country" TEXT,
    "street" TEXT,
    "zip" TEXT,
    "city" TEXT
);
INSERT INTO "new_User" ("birthday", "city", "clubEntryDate", "clubFunction", "clubMemberId", "clubMembershipType", "country", "createdAt", "email", "firstname", "hashedPassword", "id", "isPublic", "isSubscribedOfficial", "isSubscribedPublic", "lastname", "location", "name", "role", "slug", "species", "speciesIcon", "street", "telegram", "updatedAt", "website", "zip") SELECT "birthday", "city", "clubEntryDate", "clubFunction", "clubMemberId", "clubMembershipType", "country", "createdAt", "email", "firstname", "hashedPassword", "id", "isPublic", "isSubscribedOfficial", "isSubscribedPublic", "lastname", "location", "name", "role", "slug", "species", "speciesIcon", "street", "telegram", "updatedAt", "website", "zip" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "avatarId" INTEGER,
    "authorId" INTEGER,
    "name" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    CONSTRAINT "File_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_File" ("createdAt", "extension", "id", "mimeType", "name", "path", "size", "updatedAt") SELECT "createdAt", "extension", "id", "mimeType", "name", "path", "size", "updatedAt" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE UNIQUE INDEX "File_avatarId_key" ON "File"("avatarId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
