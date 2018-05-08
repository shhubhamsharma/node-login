var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, response, next) {
    console.log(req.body)
  var query="Update users set password=MD5(?),phone=? where uniqueid=?"
  var connection=req.app.get("connection");
  connection.query(query,[req.body.password,req.body.phone,req.body.uniqueid],function(err,resp){
    if(err){
      response.status(500);
      response.send("Error")
    }
    else{
      response.status(200);
      response.send(resp)
    }
  });
});

module.exports = router;
