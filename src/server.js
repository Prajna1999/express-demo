const http = require('http');
const path=require('path')
const {v4:uuidv4}=require('uuid');
const logger = require('./middleware/logger');
const {errorHandlingMiddleware} = require('./middleware/errorHandlingMiddleware');
const bodyParser=require('./middleware/bodyParser');
const cookieParser=require('./middleware/cookieParser');
const staticFileMiddleware=require('./middleware/staticFileMiddleware');
const {handleNotFound}=require('./middleware/handleNotFound');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const Router = require('./utils/router');

//session object
const sessions={};


const app = new Router();

// Adding middleware
app.use(logger);

//jsonparser middleware
app.use(bodyParser);

//cookieparser middleware
app.use(cookieParser);

// session cookie. extract it to a middleware module later
app.use((req, res,next)=>{
    let sessionId=req.cookies.sessionId;

    // create a new session if there is no sessionId
    if(!sessionId){
        sessionId=uuidv4();
        res.setHeader('Set-Cookie',`sessionId=${encodeURIComponent(sessionId)}; Path=/; HttpOnly`);

    }
    //retrieve the session data
    req.session=sessions[sessionId]||{};
    //Store the session ID so we can save the session data later
    req.sessionId=sessionId;
    
    next();
})
// save the session data back to the sessions object at the end
// of each request
app.use((req, res,next)=>{
    sessions[req.sessionId]=req.session;
    next();
})

//staticFileMiddleware that serves static files from the public directory

app.use(staticFileMiddleware(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log('Parsed cookies: ', req.parsedCookies);
    req.session.views=(req.session.views ||0)+1;
    res.send('See console for cookies '+`View Number ${req.session.views}`);
    
});
 

app.use('/',indexRouter);
app.use('/users', usersRouter);

// error handling middleware
// app.use(handleNotFound)
// app.use(errorHandlingMiddleware )

// Creating the server
// Creating the server
const server = http.createServer((req, res) => {
    app.handle(req, res, (err) => {
        if (err) {
            errorHandlingMiddleware(err, req, res, () => {});
        } else {
            handleNotFound(req, res);
        }
    });
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
