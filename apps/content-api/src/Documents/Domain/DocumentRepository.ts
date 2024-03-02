import { Document } from "@org/types";
export interface DocumentRepository {
    findPublishedDocument(id: string): Promise<Document>;
    getAllPublished(): Promise<Document[]>;
}
