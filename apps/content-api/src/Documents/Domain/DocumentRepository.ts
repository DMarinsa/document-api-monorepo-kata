import { Document } from "@org/types";

export interface DocumentRepository {
    getDocument(id: string): Promise<Document>;
    getDocuments(): Promise<Document[]>;
    createDocument(document: Document): Promise<Document>;
    updateDocument(document: Document): Promise<Document>;
    deleteDocument(id: string): Promise<void>;
}