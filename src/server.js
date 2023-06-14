const http = require('http');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const bodyParser=require('./middleware/bodyParser');
const cookieParser=require('./middleware/cookieParser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const Router = require('./utils/router');


const app = new Router();

// Adding middleware
app.use(logger);

//jsonparser middleware
app.use(bodyParser);

//cookieparser middleware
app.use(cookieParser);

// Error handling middleware should be added last
app.use(errorHandler);
// Mounting routers
app.use('/', indexRouter);
app.use('/users', usersRouter);



// Creating the server
const server = http.createServer((req, res) => {
    app.handle(req, res, () => {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Route not found\n');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
