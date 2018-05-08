var express = require('express');
var router = express.Router();
var moment =require('moment');
/* GET home page. */
router.post('/', function(req, response, next) {
  var connection=req.app.get("connection");
  console.log(connection);
  connection.beginTransaction(function(err){
      if(err){
      response.statusCode=500
      response.send(err);
      }
      else{
        var reqParams=req.body.data;
        console.log(reqParams)
        var query="INSERT into books(title,author,isbn,pub_date) values(?,?,?,?)";
       var q= connection.query(query,[reqParams.title,reqParams.author,reqParams.isbn,moment(reqParams.pub_date).format("YYYY-MM-DD")],function(err,result){
            if(err){
                connection.rollback(function(error){
                    response.status=500;
                    response.send(err);
                })
            }
            else{
                connection.commit(function(err){
                    console.log(err)
                    response.status=200;
                    response.send("success");
                });
            }
        });
        console.log(q.sql)
      }
  });
  
});

module.exports = router;
