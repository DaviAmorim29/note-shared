/*
  Warnings:

  - A unique constraint covering the columns `[noteId,userId]` on the table `UserNoteCollaborator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserNoteCollaborator_noteId_userId_key" ON "UserNoteCollaborator"("noteId", "userId");
