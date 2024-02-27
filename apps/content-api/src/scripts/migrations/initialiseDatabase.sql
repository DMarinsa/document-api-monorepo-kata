CREATE TABLE IF NOT EXISTS "User" (
  "id" UUID PRIMARY KEY,
  "name" VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "Document" (
  "id" UUID PRIMARY KEY,
  "title" VARCHAR(255),
  "content" TEXT,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP,
  "status" VARCHAR(255),
  "authorId" UUID,
  "lastEditorId" UUID,
  FOREIGN KEY ("authorId") REFERENCES "User" ("id"),
  FOREIGN KEY ("lastEditorId") REFERENCES "User" ("id")
);

CREATE TABLE IF NOT EXISTS "DocumentVersion" (
  "id" UUID PRIMARY KEY,
  "versionNumber" INTEGER,
  "content" TEXT,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP,
  "documentId" UUID,
  "authorId" UUID,
  FOREIGN KEY ("documentId") REFERENCES "Document" ("id"),
  FOREIGN KEY ("authorId") REFERENCES "User" ("id")
);
