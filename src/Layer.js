// contains the path and necessary function reference to execute when a path matches the given request.
module.exports=Layer;

// it just holds the handle and function names;

function Layer(path, options, fn){

  if(!this instanceof Layer){
    return new Layer(path, options, fn);
  }

  this.handle=fn;
  this.name=fn.name||'<anonymous>';
  this.params=undefined;
  this.path=undefined;
  
}

Layer.prototype.handle_request=function handle(req, res, next){
  const fn=this.handle;

  try{
    fn(req, res,next);
  }catch(err){
    console.error(err);
  }
}

Layer.prototype.match=function match(path){
  return this.route.path===path;
}