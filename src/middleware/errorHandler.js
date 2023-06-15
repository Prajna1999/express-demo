module.exports = function (req, res, next) {
    // console.error(err.stack);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error\n');
    
};
