import Router from "koa-router";
import { DocumentController } from "../../Application/DocumentsController";
import { Context } from "koa";

export const DocumentRoutes = (router: Router) => {
    const repo: any = {};

    const documentController = new DocumentController(repo);
    router.post("/documents", async (ctx: Context) => {
        const result = await documentController.getDocument(ctx);
        ctx.response.body = result;
        ctx.response.status = 200;
    });

    router.post("/documents/:id/drafts", async (ctx: Context) => {
        const result = await documentController.createDocumentVersion(ctx);
        ctx.response.body = result;
        ctx.response.status = 200;
    });

    router.get("/documents/:id", async (ctx: Context) => {
        const result = await documentController.getDocument(ctx);
        ctx.response.body = result;
        ctx.response.status = 200;
    });

    router.get("/documents", async (ctx: Context) => {
        const result = await documentController.getAllDocuments();

        ctx.response.body = result;
        ctx.response.status = 200;
    });
};