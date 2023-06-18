const Router=require('../utils/router');

const router=new Router();

//use get method
router.get('/', (req, res, next)=>{
    
    res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({message:"Hello from mini-express"}));
   
})



module.exports=router