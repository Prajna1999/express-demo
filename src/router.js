const setPrototypeOf=require('setprototypeof')
var Route = require('./route');
var Layer = require('./Layer');

const parseUrl=require("parseurl")

// getpathname middleware
function getPathname(req){
  try{
    return parseUrl(req).pathname;
  }catch(err){
    return undefined
  }
}
// handles the routing logic.
const proto=module.exports=function(options){
  const opts=options||{};

  function router(req, res, next){
    router.handle(req,res,next);
  }

  setPrototypeOf(router, proto);

  router.params={};
  router._params=[];
  router.caseSensitive=opts.caseSensitive;
  router.mergeParams=opts.mergeParams;
  router.strict=opts.strict;
  router.stack=[];

  return router;
};

// users may add specific routes into the stack;

proto.route=function router(path){
  const route=new Route(path);
  const layer=new Layer(path, {},                    route.dispatch.bind(route));

  layer.route=route;

  this.stack.push(layer);

  return route;
}

// send some responses from the router.

proto.handler=function handle(req, res, out){
  const self=this;
  const stack=self.stack;
  const layer=stack[0];
  const route=layer.route;

  route.stack[0].handle_request(req, res);
  
}


// implement the handle method.
proto.handle=function handle(req, res, out){
  const self=this;
  const stack=self.stack;
  const path=getPathname(req);

  // find the next matching layer.
  let layer, match, route;
  let idx=0;

  while(match!==true && idx<stack.length){
    layer=stack[idx++];

    match=matchLayer(layer.path);
    route=layer.route;

    if(match!==true){
      continue;
    }
    if(!route){
      continue;
    }

    // handle the request;
    route.stack[0].handle_request(req, res);
  }
}

function matchLayer(layer, path){
  try{
    return layer.match(path);
  }catch(err){
    return err;
  }
}