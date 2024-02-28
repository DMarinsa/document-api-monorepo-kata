import { UUID } from 'crypto';

export interface DocumentVersion {
  id: UUID;
  versionNumer: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  documentId: UUID;
  authorId: UUID;
}
