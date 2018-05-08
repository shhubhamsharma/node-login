var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, response, next) {
  var query="SELECT name,email,password as token,uniqueid,phone,referralId from users where email=? and password=MD5(?);"
  var connection=req.app.get("connection");
 var a= connection.query(query,[req.body.data.email,req.body.data.password],function(err,resp){
    if(err){
      response.statusCode=500;
      console.log(err)
      response.send("Error")
    }
    else{
      response.status(200);
      if(resp.length!=0){
        response.send(resp);
        return;
      }
      else{
        response.status(401)
        response.send(resp);
      }
      
    }
  });
  console.log(a.sql)
});

module.exports = router;
