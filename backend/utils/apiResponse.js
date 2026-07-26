


class ApiResponse {


    constructor(statusCode, data, message = 'success') {

        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data =data;

    }



}



export const sendResponse = (res, statusCode, data, message) => {


    const response = new ApiResponse(statusCode,data,message);

 return res.status(statusCode).json(response);
}

export default ApiResponse;

