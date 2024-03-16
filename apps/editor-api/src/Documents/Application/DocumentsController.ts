import { Context } from "koa";
import { DocumentRepository } from "../Domain/DocumentRepository";
import { NotFoundError } from "@org/types";
import { DocumentDto } from "../Domain/DocumentDto";

export class DocumentController {
    constructor(private documentRepository: DocumentRepository) {   
    }

    async createDocument(ctx: Context) {
        const document = ctx.request.body as DocumentDto;

        await this.documentRepository.insertDocument(document);

        ctx.body = document;
        ctx.status = 201;
    }

    async createDocumentVersion(ctx: Context) {
        const result = this.documentRepository.findDraftDocument(ctx.params.id);
        if (!result) {
            throw new NotFoundError(`Document with id ${ctx.params.id} not found`);
        }

        return result;
    }

    async updateDocumentVersion(ctx: Context) {
        const document = ctx.request.body;
        return this.documentRepository.updateDocument(document);
    }

    async publishDocument(ctx: Context) {
        const document = ctx.request.body;
        return this.documentRepository.updateDocument(document);
    }
}