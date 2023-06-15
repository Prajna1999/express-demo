const fs=require('fs');
const path=require('path');

module.exports=function(directory){
    return (req, res,next)=>{
        //middleware implementation goes here
        const filePath=path.join(directory, req.url);

        //checking thefile existence and handling errors.
        fs.stat(filePath, (err, stats)=>{

            // if an error occurs
            if(err){
                if(err.code==="ENOENT"){
                    //file does not exist, call the next middleware
                    return next();
                }

                // some other error occured, pass it to the next middleware
                return next(err);
            }

            //if the file exists
            if(stats.isFile()){
                //send it as a stream response
                const stream=fs.createReadStream(filePath);
                stream.on('error', next);
                stream.pipe(res);
            }else{
                // not a file call the next middleware
                next();
            }

        })
    }
}