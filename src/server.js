const http=require('http');
const Router=require('./router');

const router=new Router();
// adding middlewares
const middleware=[];

function use(fn){
  middleware.push(fn);
}

use((req, res, next)=>{
  console.log( `Received request from ${req.url}`);

  next();
});

// error handling
use((err, req, res, next)=>{
  console.error(err.stack);
  res.statusCode=500;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Something went wrong \n');
})

// create router table

router.get('/', (req,res)=>{
  res.statusCode=200;
  res.setHeader('Content-Type','text/plain');
  res.end('Hello, world!\n');
})

router.get('/users/:userId', (req, res)=>{
  const userId=req.params[0];
  res.statusCode=200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`User ID is ${userId}\n`);
})









// create a server
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


// listen the server

const PORT=3000||process.env.PORT
server.listen(PORT, '127.0.0.1', ()=>{
  console.log('Server running at port '+ PORT);
});
1