import { Context } from "koa";
import { DocumentRepository } from "../Domain/DocumentRepository";
import { NotFoundError } from "@org/types";

export class DocumentController {
    constructor(private documentRepository: DocumentRepository) {   
    }

    async getDocument(ctx: Context) {
        const result = this.documentRepository.findPublishedDocument(ctx.params.id);
        if (!result) {
            throw new NotFoundError(`Document with id ${ctx.params.id} not found`);
        }

        return result;
    }

    async getAllDocuments() {
        return this.documentRepository.getAllPublishedDocuments();
    }
}