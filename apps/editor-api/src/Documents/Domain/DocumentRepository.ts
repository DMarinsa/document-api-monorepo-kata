import { DocumentResponse } from "@org/types";
import { UUID } from "crypto";
import { DocumentDto } from "./DocumentDto";
export interface DocumentRepository {
    insertDocument(document: DocumentDto): Promise<DocumentResponse>;
    insertDocumentVersion(document: DocumentDto): Promise<DocumentResponse>;
    updateDocument(document: DocumentDto): Promise<DocumentResponse>;
    getDocuments(id: UUID): Promise<DocumentResponse[]>;
}
