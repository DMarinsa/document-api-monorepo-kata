import { Document, DocumentResponse, Status } from "@org/types";
import { DocumentRepository } from "../../Domain/DocumentRepository";
import { PGConnector } from "@org/pg-connector";
import { inject, injectable } from "inversify";
import { DocumentDto } from "../../Domain/DocumentDto";

@injectable()
export class PgDocumentRepository implements DocumentRepository {
    constructor(
        @inject('PGConnector')
        private pgConnector: PGConnector
        ) {}
    
    async insertDocument(document: DocumentDto): Promise<DocumentResponse> {
        this.pgConnector.query(`
        BEGIN;

        INSERT INTO "Documents" (
            id,
            title,
            createdAt,
            status,
            authorId,
            updatedAt,
            lastEditorId,
            publishedVersionId) 
            VALUES (
                ${document.id},
                ${document.title},
                ${document.createdAt},
                ${document.status},
                ${document.authorId},
                ${document.updatedAt},
                ${document.lastEditorId},
                ${document.publishedVersionId}
                ) RETURNING id INTO document_id;
        
        INSERT INTO "DocumentVersions" (
            id
            authorId
            versionNumber
            documentId
            content
            createdAt
            updatedAt) 
            VALUES (
                ${document.versionId},
                ${document.authorId},
                ${document.title},
                ${document.createdAt},
                ${document.status},
                ${document.updatedAt},
                ${document.lastEditorId},
                ${document.publishedVersionId}
                );
        COMMIT;
        `)

        const documentResponse: DocumentResponse = {
            id: document.id,
            title: document.title,
            createdAt: document.createdAt,
            authorId: document.authorId,
            updatedAt: document.updatedAt,
            lastEditorId: document.lastEditorId,
            content: document.content
        };

        return documentResponse;
    }

    updateDocument(document: Document): Promise<Document> {
        throw new Error("Method not implemented.");
    }
    getDocuments(id: `${string}-${string}-${string}-${string}-${string}`): Promise<Document> {
        throw new Error("Method not implemented.");
    }

    async findPublishedDocument(id: string): Promise<Document> {
        try {
            const query = `
            SELECT d.title AS title, dv.content AS content
            FROM Documents d
            INNER JOIN DocumentVersions dv ON d.publishedVersionId = dv.id
            WHERE d.id = '${id}'
            AND d.status = '${Status.PUBLISHED}';`;
            const result = await this.pgConnector.query(query);
            
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error finding document with id ${id}`);
        }
    }
    
    async getAllPublishedDocuments(): Promise<Document[]> {
        const query = `SELECT d.id AS document_id, d.title, dv.content
        FROM Documents d
        INNER JOIN DocumentVersions dv ON d.publishedVersionId = dv.id
        WHERE d.status = '${Status.PUBLISHED}';`;
        
        const result = await this.pgConnector.query(query);
            
        return result.rows
    }
    
}