const Router=require('../utils/router');

const router=new Router();

//use get method
router.get('/', (req, res, next)=>{
    
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to our mini-express app! \n');
   
})



module.exports=router