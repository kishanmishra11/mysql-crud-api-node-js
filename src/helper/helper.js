//success response function
exports.success = (res,message,status,statusCode,data = null,extra) => {
    let success="";
    success = {
        meta:{
            status: status,
            message:message,
            ...extra,
        },
        data: data,
        statusCode:statusCode
    };
    return res.send(success);
};

//error response function
exports.error = (res,statusCode,message) => {
    let error="";
    error = {
        statusCode:statusCode,
        message: message
    };
    return res.status(statusCode).send(error);
};