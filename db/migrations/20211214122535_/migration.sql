/*
  Warnings:

  - Added the required column `attendeeStatus` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "paidAmount" DECIMAL,
    "paymentStatus" TEXT NOT NULL,
    "discount" DECIMAL,
    "attended" DATETIME,
    "accepted" DATETIME,
    "waiting" DATETIME,
    "bookedin" DATETIME,
    "signedoff" DATETIME,
    CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Registration" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Registration";
DROP TABLE "Registration";
ALTER TABLE "new_Registration" RENAME TO "Registration";
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
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Event_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("bankaccountAddress", "bankaccountBIC", "bankaccountHolder", "bankaccountIBAN", "city", "country", "createdAt", "description", "endDate", "id", "imageId", "isRegistrationOpen", "latitude", "longitude", "minimumAge", "name", "paymentDue", "public", "registrationEndDate", "registrationStartDate", "sellPrice", "signoff", "signoffEndDate", "slug", "startDate", "street", "telegram", "ticketLimit", "updatedAt", "zip") SELECT "bankaccountAddress", "bankaccountBIC", "bankaccountHolder", "bankaccountIBAN", "city", "country", "createdAt", "description", "endDate", "id", "imageId", "isRegistrationOpen", "latitude", "longitude", "minimumAge", "name", "paymentDue", "public", "registrationEndDate", "registrationStartDate", "sellPrice", "signoff", "signoffEndDate", "slug", "startDate", "street", "telegram", "ticketLimit", "updatedAt", "zip" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_imageId_key" ON "Event"("imageId");
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
INSERT INTO "new_User" ("createdAt", "email", "hashedPassword", "id", "name", "role", "slug", "species", "updatedAt") SELECT "createdAt", "email", "hashedPassword", "id", "name", "role", "slug", "species", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
