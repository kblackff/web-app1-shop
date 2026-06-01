const constants = {
    SERVER_ERROR: 500,
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404
}

export const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode ? res.statusCode : 500;
    switch(statuscode) {
        case constants.SERVER_ERROR: 
        res.json({
            title: "SERVER ERROR",
            message: err.message,
            stackTrace: err.stack
        })
        break;
        case constants.FORBIDDEN: 
        res.json({
            title: "NO PERMISSONS",
            message: err.message,
            stackTrace: err.stack
        })
        break;
        case constants.NOT_FOUND: 
        res.json({
            message: err.message,
            stackTrace: err.stack
        })
        break;
        case constants.UNAUTHORIZED: 
        res.json({
            title: "UNAUTHORIZED",
            message: err.message,
            stackTrace: err.stack
        })
        break;
        case constants.VALIDATION_ERROR: 
        res.json({
            title: "UNABLE TO VALIDATE",
            message: err.message,
            stackTrace: err.stack
        })
        break;
        default: 
        console.log("NO ERRORS");
    }
};
