/*
  Warnings:

  - You are about to drop the column `username` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `pseudo` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "pseudo" TEXT NOT NULL,
    CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Rating_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Rating" ("bookId", "id", "userId", "value") SELECT "bookId", "id", "userId", "value" FROM "Rating";
DROP TABLE "Rating";
ALTER TABLE "new_Rating" RENAME TO "Rating";
CREATE UNIQUE INDEX "Rating_userId_bookId_key" ON "Rating"("userId", "bookId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
