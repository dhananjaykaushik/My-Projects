import ApiResponse from "./api-response";

export default class ApiSuccessResponse extends ApiResponse {

    /**
     * Creates an instance of ApiSuccessResponse.
     * @param {*} statusCode Status code
     * @param {*} data Api Response
     * @memberof ApiSuccessResponse
     */
    constructor(statusCode, data) {
        super(statusCode);
        this.#data = data;
    }
}