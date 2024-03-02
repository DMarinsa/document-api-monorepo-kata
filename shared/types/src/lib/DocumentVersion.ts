import { UUID } from 'crypto';

export interface DocumentVersion {
  id: UUID;
  versionNumer: number;
  authorId: UUID;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  documentId: UUID;
}
