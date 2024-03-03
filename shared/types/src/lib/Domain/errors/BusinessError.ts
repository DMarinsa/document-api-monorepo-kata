import { BaseError } from "./BaseError";

export class BusinessError extends BaseError {
    constructor(message: string, options = {}) {
        super(message, options);
    }
}