import { Document } from "@org/types";
import { DocumentRepository, Filter } from "../Domain/DocumentRepository";

export class PgDocumentRepository implements DocumentRepository {
    findPublishedDocument(id: string): Promise<Document> {
        throw new Error("Method not implemented.");
    }
    searchDocuments(filter: Filter): Promise<Document[]> {
        throw new Error("Method not implemented.");
    }
}