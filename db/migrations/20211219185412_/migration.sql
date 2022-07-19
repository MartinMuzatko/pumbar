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
    "city" TEXT,
    "fileId" INTEGER,
    CONSTRAINT "User_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("birthday", "city", "clubEntryDate", "clubFunction", "clubMemberId", "clubMembershipType", "country", "createdAt", "email", "firstname", "hashedPassword", "id", "isPublic", "isSubscribedOfficial", "isSubscribedPublic", "lastname", "location", "name", "role", "slug", "species", "speciesIcon", "street", "telegram", "updatedAt", "website", "zip") SELECT "birthday", "city", "clubEntryDate", "clubFunction", "clubMemberId", "clubMembershipType", "country", "createdAt", "email", "firstname", "hashedPassword", "id", "isPublic", "isSubscribedOfficial", "isSubscribedPublic", "lastname", "location", "name", "role", "slug", "species", "speciesIcon", "street", "telegram", "updatedAt", "website", "zip" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
