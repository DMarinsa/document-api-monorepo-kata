import { DocumentRepository } from "../Domain/DocumentRepository";

export class DocumentController {
    constructor(private documentRepository: DocumentRepository) {   
    }

    async getDocument(id: string) {
        return this.documentRepository.findPublishedDocument(id);
    }

    async getAllDocuments() {
        return this.documentRepository.getAllPublished();
    }
}