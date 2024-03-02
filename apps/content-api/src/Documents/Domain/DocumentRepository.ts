import { Document } from "@org/types";

export interface Filter {
    title?: string;
    status?: string;
}
export interface DocumentRepository {
    findPublishedDocument(id: string): Promise<Document>;
    searchDocuments(filter: Filter): Promise<Document[]>;
}
