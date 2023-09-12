-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserNoteCollaborator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    CONSTRAINT "UserNoteCollaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserNoteCollaborator_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserNoteCollaborator" ("id", "noteId", "userId") SELECT "id", "noteId", "userId" FROM "UserNoteCollaborator";
DROP TABLE "UserNoteCollaborator";
ALTER TABLE "new_UserNoteCollaborator" RENAME TO "UserNoteCollaborator";
CREATE UNIQUE INDEX "UserNoteCollaborator_id_key" ON "UserNoteCollaborator"("id");
CREATE UNIQUE INDEX "UserNoteCollaborator_noteId_userId_key" ON "UserNoteCollaborator"("noteId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
