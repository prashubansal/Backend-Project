class ApiResponse {
    constructor(
        statusCode, 
        data, 
        message = "Success"
    ){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export {ApiResponse}

// 1. Informational responses (100 – 199)
// 2. Successful responses (200 – 299)
// 3. Redirection messages (300 – 399)
// 4. Client error responses (400 – 499)
// 5. Server error responses (500 – 599)