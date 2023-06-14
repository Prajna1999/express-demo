const http=require('http');
const Router=require('./router');

const router=new Router();
// adding middlewares
const middleware=[];

// function to use middleware
function use(fn){
  middleware.push(fn);
}

// log middleware:log the request method and URL
use((req, res, next)=>{
  console.log( `Recieved ${req.method} request for ${req.url}`);

  next();
});

//Error handling middleware: log the error and send a 500 response
use((err, req, res, next)=>{
  console.error(err.stack);
  res.statusCode=500;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Internal Server Error\n');
});

// build the HTTP server
const server = http.createServer((req, res) => {
    let i = 0;

    // This function is called to process the next middleware
    function next(err) {
        // If an error occurred, skip to the error-handling middleware
        if (err) {
            return middleware.find(mw => mw.length === 4)(err, req, res, next);
        }
        
        // If there's no next middleware, we're done
        if (i >= middleware.length) {
            const handler = router.match(req);
            if (handler) {
                handler(req, res);
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Route not found\n');
            }
            return;
        }

        const mw = middleware[i++];

        // Skip error handling middleware if there's no error
        if (mw.length === 4) {
            return next();
        }

        mw(req, res, next);
    }

    next();
});

module.exports=={server}