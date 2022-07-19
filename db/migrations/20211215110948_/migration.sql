-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "imageId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Event_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("bankaccountAddress", "bankaccountBIC", "bankaccountHolder", "bankaccountIBAN", "city", "country", "createdAt", "description", "endDate", "id", "imageId", "isRegistrationOpen", "latitude", "longitude", "minimumAge", "name", "paymentDue", "public", "registrationEndDate", "registrationStartDate", "sellPrice", "signoff", "signoffEndDate", "slug", "startDate", "street", "telegram", "ticketLimit", "updatedAt", "userId", "zip") SELECT "bankaccountAddress", "bankaccountBIC", "bankaccountHolder", "bankaccountIBAN", "city", "country", "createdAt", "description", "endDate", "id", "imageId", "isRegistrationOpen", "latitude", "longitude", "minimumAge", "name", "paymentDue", "public", "registrationEndDate", "registrationStartDate", "sellPrice", "signoff", "signoffEndDate", "slug", "startDate", "street", "telegram", "ticketLimit", "updatedAt", "userId", "zip" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_imageId_key" ON "Event"("imageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
