import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
    constructor(message: string, options = {}) {
        super(message, options);
    }
}