/*
  Warnings:

  - You are about to drop the `backgrounds` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "backgrounds_createdAt_idx";

-- DropIndex
DROP INDEX "backgrounds_userId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "backgrounds";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "backgroundId" TEXT,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_notes" ("backgroundId", "content", "createdAt", "id", "isPinned", "title", "updatedAt", "userId") SELECT "backgroundId", "content", "createdAt", "id", "isPinned", "title", "updatedAt", "userId" FROM "notes";
DROP TABLE "notes";
ALTER TABLE "new_notes" RENAME TO "notes";
CREATE INDEX "notes_userId_idx" ON "notes"("userId");
CREATE INDEX "notes_createdAt_idx" ON "notes"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
