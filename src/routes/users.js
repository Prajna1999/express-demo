const Router=require('../utils/router');
const router=new Router();

router.get('/:userId', (req, res)=>{
    if(!userId){
        throw new Error('User does not exist')
    }

    const userId=req.params[0];
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`User ID is ${userId}`);
});

module.exports=router