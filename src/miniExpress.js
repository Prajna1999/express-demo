const http = require('http');
const url = require('url');

const MiniExpress = () => {

  const methods = ['get', 'post', 'put', 'delete'];

  const app = (req, res) => {
    const method = req.method.toLowerCase();
    const reqUrl = url.parse(req.url, true);

    // Find the correct route handler
    const matchedRoute = app.routes.find(route => {
      if (route.method !== method) return false;

      // Check for dynamic route
      if (route.path.includes(':')) {
        const routePaths = route.path.split('/');
        const urlPaths = reqUrl.pathname.split('/');

        if (routePaths.length !== urlPaths.length) return false;

        const params = {};
        const match = routePaths.every((pathPart, index) => {
          if (pathPart.startsWith(':')) {
            params[pathPart.slice(1)] = urlPaths[index];
            return true;
          }

          return pathPart === urlPaths[index];
        });

        if (match) {
          req.params = params;
        }

        return match;
      }

      return route.path === reqUrl.pathname;
    });

    if (matchedRoute && matchedRoute.handler) {
      // If we found a route, call its handler
      matchedRoute.handler(req, res);
    } else {
      // If not, return 404
      res.statusCode = 404;
      res.end(`Cannot ${method.toUpperCase()} ${reqUrl.pathname}`);
    }
  };

  app.routes = [];

  methods.forEach(method => {
    app[method] = (path, handler) => {
      app.routes.push({
        method,
        path,
        handler
      });
    };
  });

  app.listen = (port, callback) => {
    const server = http.createServer(app);
    return server.listen({ port }, callback);
  };

  return app;
};

module.exports = MiniExpress;
