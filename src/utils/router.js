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

    handle(req, res, parentNext) {
        let i = 0;

        const next = (err) => {
            if (err) return parentNext(err);
            if (i >= this.middleware.length) {
                const route = this.match(req);
                return route ? route.handler(req, res) : parentNext();
            }
            const mw = this.middleware[i++];
            mw.path.test(req.url) && mw.fn(req, res, next);
        };

        next();
    }
    //important use method
    use(path, fn) {
      if (typeof path === 'function') {
          fn = path;
          path = '/';
      }
  
      if (fn instanceof Router) {
          const childRouter = fn;
          fn = (req, res, next) => childRouter.handle(req, res, next);
      }
      this.middleware.push({
          path: this.pathToRegExp(path),
          fn
      });
  }
    get(path, handler) {
        this.routes.GET.push({ path: this.pathToRegExp(path), handler });
    }

    post(path, handler) {
        this.routes.POST.push({ path: this.pathToRegExp(path), handler });
    }

    put(path, handler) {
        this.routes.PUT.push({ path: this.pathToRegExp(path), handler });
    }

    patch(path, handler) {
        this.routes.PATCH.push({ path: this.pathToRegExp(path), handler });
    }

    delete(path, handler) {
        this.routes.DELETE.push({ path: this.pathToRegExp(path), handler });
    }

    head(path, handler) {
        this.routes.HEAD.push({ path: this.pathToRegExp(path), handler });
    }

    options(path, handler) {
        this.routes.OPTIONS.push({ path: this.pathToRegExp(path), handler });
    }

    connect(path, handler) {
        this.routes.CONNECT.push({ path: this.pathToRegExp(path), handler });
    }

    trace(path, handler) {
        this.routes.TRACE.push({ path: this.pathToRegExp(path), handler });
    }

    pathToRegExp(path) {
        const pathParts=path.split('/').map(part => part.startsWith(':') ? '(\\w+)' : part);
        return new RegExp(`^${pathParts.join('/')}$`);
    }

    match(req) {
        const methodRoutes = this.routes[req.method];
        for (const { path, handler } of methodRoutes) {
            const match = req.url.match(path);
            if (match) {
                req.params = match.slice(1); // capture groups are in position 1 and onwards
                return { handler };
            }
        }
    }
}

module.exports = Router;
