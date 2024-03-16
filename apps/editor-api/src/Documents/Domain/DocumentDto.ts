import { Status } from "@org/types";
import { UUID } from "crypto";

export interface DocumentDto {
    authorId: UUID;
    content: string;
    title: string;
    versionNumer: number;
    createdAt?: Date;
    id?: UUID;
    versionId?: UUID;
    lastEditorId?: UUID;
    publishedVersionId?: UUID;
    status?: Status;
    updatedAt?: Date;
}