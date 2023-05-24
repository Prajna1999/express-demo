
var setPrototypeOf = require('setprototypeof')
var methods = require('methods');
var Router = require('./router');
var Layer = require('./Layer')
var slice = Array.prototype.slice;
var http = require('http');

const app=exports=module.exports={};

app.init=function(){
  this.cache={};
  this.engines={};
  this.settings={};

  this._router=undefined;
};


// create a lazyRouter
app.lazyrouter=function lazyrouter(){
  if(!this._router){
    this._router=new Router({})
  }
}

// create a request handler
app.handle=function handle(req, res, callback){
  const router=this._router;

  router.handle(req, res);
};




// implement all the http methods
methods.forEach(function (method){
  app[method]=function(path){
    this.lazyrouter();

    const route=this._router.route(path);

    route[method].apply(route, slice.call(arguments,1));

    return this;
  }
});

// expose a listen method on application.

app.listen=function listen(){
  const server=http.createServer(this);

  return server.listen.apply(server, arguments);
}








