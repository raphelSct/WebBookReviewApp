-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "pseudo" TEXT NOT NULL
);
INSERT INTO "new_Rating" ("bookId", "id", "pseudo", "value") SELECT "bookId", "id", "pseudo", "value" FROM "Rating";
DROP TABLE "Rating";
ALTER TABLE "new_Rating" RENAME TO "Rating";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
