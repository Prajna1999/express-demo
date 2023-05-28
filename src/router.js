class Router {
    constructor() {
        this.routes = {
            GET: [],
            POST: [],
            // add more HTTP methods as needed
        };
    }

    get(path, handler) {
        this.routes.GET.push({ path: this.pathToRegExp(path), handler });
    }

    post(path, handler) {
        this.routes.POST.push({ path: this.pathToRegExp(path), handler });
    }

    pathToRegExp(path) {
        const pathParts = path.split('/').map(part => part.startsWith(':') ? '(\\w+)' : part);
        return new RegExp(`^${pathParts.join('/')}$`);
    }
    match(req){
        const methodRoutes=this.routes[req.method];
        for(const {path, handler} of methodRoutes){
            const match=req.url.match(path);
            if(match){
                req.params=match.slice(1);
                console.log(req.params);
                return handler;
            }
        }
    }
}

module.exports = Router;
