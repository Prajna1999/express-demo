module.exports = function(req, res, next) {
  let data = "";

  req.setEncoding('utf8'); // Here we set the encoding

  req.on('data', function(chunk) {
    data += chunk;
  });

  req.on('end', function() {
    req.rawBody = data;
    console.log('on end:', data);

    //if opening braces exist
    if(data && data.indexOf('{') > -1) {
      try {
        req.body = JSON.parse(data);
      } catch(e) {
        return res.status(400).send(`Invalid JSON string: ${e.message}`);
      }
    }
    //invoke the next middleware
    next();
  });
};
