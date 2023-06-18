function errorHandlingMiddleware(err, req, res, next) {
    // Log the error, for now just console.log
    console.log(err);

    // Set HTTP status code. If error doesn't have status, default to 500
    res.statusCode = err.status || 500;

    // Set response content type to be JSON
    res.setHeader('Content-Type', 'application/json');

    // Send the error data in the response
    res.end(JSON.stringify({
        message: err.message,
        // If we're not in production, include the stack trace
        ...(process.env.NODE_ENV === 'production' ? {} : { stack: err.stack }),
    }));
}
module.exports={errorHandlingMiddleware};