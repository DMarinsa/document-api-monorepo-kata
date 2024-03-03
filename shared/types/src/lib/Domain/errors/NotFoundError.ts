import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(message: string, options = {}) {
        super(message, options);
    }
}