import Router from "koa-router";
import { DocumentRoutes } from "./Documents.routes";

export function registerRoutes(router: Router) {
    DocumentRoutes(router);
}