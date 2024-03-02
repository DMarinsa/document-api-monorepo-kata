import { UUID } from 'crypto';
import { Status } from './Status';

export interface Document {
  id: UUID;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  authorId: UUID;
  lastEditorId: UUID;
  publishedVersionId: UUID;
}
