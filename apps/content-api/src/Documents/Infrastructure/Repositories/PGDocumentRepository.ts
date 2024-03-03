import { Document, Status } from "@org/types";
import { DocumentRepository } from "../../Domain/DocumentRepository";
import { PGConnector } from "@org/pg-connector";
import { inject, injectable } from "inversify";

@injectable()
export class PgDocumentRepository implements DocumentRepository {
    constructor(
        @inject('PGConnector')
        private pgConnector: PGConnector
        ) {}

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