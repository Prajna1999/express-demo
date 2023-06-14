module.exports=function(err, req, res, next){
    console.error(err.stack);
    res.statuCode=500;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Internal Server Error \n")
};