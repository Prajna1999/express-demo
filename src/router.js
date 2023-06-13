class Router{
  constructor(){
    this.routes={
      GET:[],
      POST:[],
      PUT:[],
      DELETE:[],
      
    };
    this.middleware=[];
  }

  use(path, fn){
    if(typeof path==='string' && typeof fn==='function'){
      this.middleware.push({
        path:this.pathToRegExp(path), 
        fn
      });
    }else if(typeof path==='function'){
      this.middleware.push({
        path:this.pathToRegExp("*"),
        fn:path
      });
    }
  }

  get(path, handler){
    this.routes.GET.push({
      path:this.pathToRegExp(path),
      handler
    });
    
  }

  post(path, handler){
    this.routes.POST.push({
      path:this.pathToRegExp(path),
      handler
    });
  }

  pathToRegExp(path){
    const pathParts=path.split('/').map(part=>part.startsWith(':')?'(\\w+)':part);
    return new RegExp(`^${pathParts.join('/')}$`);
  }
  
}