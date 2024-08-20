/*
  Warnings:

  - Added the required column `lastViewedAt` to the `PackingOrder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PackingOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "date" DATETIME NOT NULL,
    "bartenders" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL,
    "notes" TEXT,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "kosher" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastViewedAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "PackingOrder_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PackingOrder" ("authorId", "bartenders", "completed", "createdAt", "date", "endTime", "guests", "id", "kosher", "location", "name", "notes", "startTime", "updatedAt") SELECT "authorId", "bartenders", "completed", "createdAt", "date", "endTime", "guests", "id", "kosher", "location", "name", "notes", "startTime", "updatedAt" FROM "PackingOrder";
DROP TABLE "PackingOrder";
ALTER TABLE "new_PackingOrder" RENAME TO "PackingOrder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
