CREATE TABLE IF NOT EXISTS "Users" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "Documents" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(255) NOT NULL DEFAULT "draft",
  authorId UUID REFERENCES Users(id),
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastEditorId UUID REFERENCES Users(id) DEFAULT NULL,
  publishedVersionId UUID REFERENCES DocumentVersions(id) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "DocumentVersions" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  authorId UUID NOT NULL REFERENCES Users(id),
  versionNumber INT NOT NULL,
  documentId UUID NOT NULL REFERENCES Documents(id),
  content TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_version_per_document UNIQUE (documentId, createdAt)
);