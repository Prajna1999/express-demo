// hold info about the route and the layer.
var methods = require('methods');
var {flatten} = require('array-flatten');
var Layer = require('./Layer')
function Route(path){
  this.path=path;
  this.stack=[];
  this.methods={}
}

Route.prototype.dispatch = function dispatch(req,res,done) {

};

// implement all the http methods.
methods.forEach(function (method){
  Route.prototype[method]=function(){
    const handles=flatten(Array.prototype.slice.call(arguments));

    for(let i=0; i<handles.length; i++){
      const handle=handles[i];

      if(typeof handle!=='function'){
        const type=toString.call(handle);
        const msg=`Route ${method} requires a callback function but got a ${type}`;

        throw new Error(msg);
      }

      // layer handler
      const layer=new Layer('/', {}, handle);
      layer.method=method;

      this.methods[method]=true;
      this.stack.push(layer);
    }
   return this;
    
  };
});

module.exports=Route;