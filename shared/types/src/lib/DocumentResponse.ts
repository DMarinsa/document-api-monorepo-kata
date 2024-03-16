import { Document } from "./Document";
import { DocumentVersion } from "./DocumentVersion";

export interface DocumentResponse extends 
Pick<Document, 'id' | 'title' | 'createdAt' | 'authorId' | 'updatedAt' | 'lastEditorId'>, 
Pick<DocumentVersion, 'content' > {}