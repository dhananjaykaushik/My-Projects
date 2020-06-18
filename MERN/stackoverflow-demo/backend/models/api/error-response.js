import ApiResponse from "./api-response";

export default class ApiErrorResponse extends ApiResponse {

    /**
     *Creates an instance of ApiErrorResponse.
     * @param {*} errorCode Error code defining the cause
     * @param {*} errorReferenceId Unique reference id for tracking error in future
     * @param {*} errorMessage Human readable cause of error
     * @memberof ApiErrorResponse
     */
    constructor(errorCode, errorReferenceId, errorMessage) {
        super(errorCode);
        this.#errorReferenceId = errorReferenceId;
        this.#message = errorMessage;
    }

}