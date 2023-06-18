const methods = require("methods");


class Router {
    constructor() {
        this.routes = {
            GET: [],
            POST: [],
            PUT: [],
            PATCH: [],
            DELETE: [],
            HEAD: [],
            OPTIONS: [],
            CONNECT: [],
            TRACE: [],
        };
        this.middleware = [];
    }

    handle(req,res, parentNext){
        let i=0;
        const next=(err)=>{
            if(err) return parentNext(err);

            if(i>=this.middleware.length){
                const route=this.match(req);

                if(route){
                    req.params=route.params;
                    return route.handler(req, res);
                }else{
                    return parentNext()
                }
            }
            // move to the next middlware
            const mw=this.middleware[i++];
            mw.path.test(req.url) && mw.fn(req, res, next);
        };

        next();
    }

    use(path, fn){
        if(typeof path==='function'){
            fn=path;
            path='/';
        }

        if(fn instanceof Router){
            const childRouter=fn;
            fn=(req, res,next)=>childRouter.handle(req, res,next);

        }
        this.middleware.push({
            path:this.pathToRegExp(path).regexp,
            fn
        });
    }
        addRoute(method, path, handler){
            const pathToRegExpResult=this.pathToRegExp(path);
            this.routes[method].push({
                ...pathToRegExpResult, handler
            });
        }

        // changed all HTTP verbs
        get(path, handler){
            this.addRoute('GET', path, handler)
        }

        post(path, handler){
            this.addRoute('POST', path, handler)
        }

        put(path, handler){
            this.addRoute('PUT', path, handler)
        }

        patch(path, handler){
            this.addRoute('PATCH', path, handler)
        }

        delete(path, handler){
            this.addRoute('DELETE', path, handler)
        }

        pathToRegExp(path){
            const paramNames=[];
            const pathParts=path.split('/').map(part=>{
                if(part.startsWith(":")){
                    paramNames.push(part.slice(1));
                    return '(\\w+)';
                }else{
                    return part;
                }
            });

            return {
                regexp: new RegExp(`^${pathParts.join('/')}$`),
                paramNames
            };
        }

        match(req){
            const methodRoutes=this.routes[req.method];
            for(const route of methodRoutes){
                const match=req.url.match(route.regexp);

                if(match){
                    const params=match.slice(1).reduce((params, value, index)=>{
                        params[route.paramNames[index]]=value;
                        return params;
                    }, {});
                    return {
                        handler:route.handler, params
                    };
                }
            }
        }
    }


module.exports = Router;
