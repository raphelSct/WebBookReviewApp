/*
  Warnings:

  - You are about to drop the column `userId` on the `Rating` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "pseudo" TEXT NOT NULL,
    CONSTRAINT "Rating_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Rating" ("bookId", "id", "pseudo", "value") SELECT "bookId", "id", "pseudo", "value" FROM "Rating";
DROP TABLE "Rating";
ALTER TABLE "new_Rating" RENAME TO "Rating";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
