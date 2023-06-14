module.exports = function(req, res, next) {
  let buf = "";

  req.setEncoding('utf8'); // Here we set the encoding

  req.on('data', function(chunk) {
    buf+= chunk;
  });

  req.on('end', function() {
    req.rawBody = buf;
    console.log('on end:', buf);

    //if opening braces exist
    if(buf && buf.indexOf('{') > -1) {
      try {
        req.body = JSON.parse(buf);
      } catch(e) {
        return res.status(400).send(`Invalid JSON string: ${e.message}`);
      }
    }
    //invoke the next middleware
    next();
  });
};
