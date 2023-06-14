module.exports=function(req, res, next){
  //initialize empty cookie object
  req.cookies={};

  //extract raw cookies from the cookie header
  const rawCookies=req.headers.cookie;

  if(rawCookies){
    const splitCookies=rawCookies.split(";");

    // iterate through the splitcookies array and
    // set the name-cookie object
    splitCookies.forEach((cookie=>{
      const [key, ...valueParts]=cookie.split("=");

      //join all the cookies that starts with =
      const value=valueParts.join("=");
      //set the name-value cookies
      try{
        req.cookies[key.trim()]=decodeURIComponent(value);
      }catch(e){
        console.error(`Failed to decode cookie: ${key}=${value}`);
        req.cookies[key.trim()]=value;
      }
    })
  }

  next();
}