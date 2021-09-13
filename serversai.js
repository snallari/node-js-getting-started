var express = require('express');
var cors = require('cors')
var app = express();
var mongodb = require('mongodb');
var ObjectId = require('mongodb');
var mongoose = require('mongoose');
app.use(express.json());
var MongoClient = mongodb.MongoClient

app.use(cors())
app.options('*', cors())

app.get('/listClasses',   function (req, respo) {
    console.log("its inside")
    var url = 'mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log("error",err)
        } else {
            console.log('Connected to', url)
            var db = client.db('students')
            var collection = db.collection('algebra');
            collection.find().toArray(function (err, res) {
                if (err) {
                    console.log(err)
                } else if (res.length) {
                    console.log("doc find", res)
                    respo.end(JSON.stringify(res))
                } else {
                    console.log('No Matches Found')
                }
                client.close();

            });

        }
    });
    // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //    console.log( data );
    //    res.end( data );
    // });
});

app.post('/addClasses',  function (req, response) {
    var url ='mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
    // First read existing users.
    //  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //     data = JSON.parse( data );
    //     data["user4"] = user["user4"];
    //     console.log( data );
    //     res.end( JSON.stringify(data));
    //  });
  //  console.log("Request", req.body[0].id)
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            console.log('Connected to', url)
            console.log("its inside", req.body)
            var db = client.db('students')
            var collection = db.collection('algebra');
            // var doc = { title: 'red apples', description: 'red' };
            // var docs = []
            // docs.push(req.body)
            if ((req.body && req.body._id === undefined)) {
              collection.insertOne(req.body, function (err, res) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("doc insert", res.insertedCount);
                  response.end(JSON.stringify(res));
                }
                client.close();
              });
            } else {
            console.log('Connected to update sai', req.body)
              var myquery = { _id: mongoose.Types.ObjectId(req.body._id)};
              var query=req;
              delete query.body._id;
              var newvalues = { $set: query.body};
              console.log(myquery, newvalues)
              collection.updateOne(myquery, newvalues, function (err, res) {
                if (err) {
                  // console.log(err)
                } else {
                  console.log("doc updated", res);
                  response.end(JSON.stringify(res));
                  collection.find().toArray(function (err, res) {
                    if (err) {
                      //      console.log(err)
                    } else {
                      //     console.log("doc inserted", res.insertedCount, res)
                      response.end(JSON.stringify(res));
                    }
                  });
                }
                client.close();
              });
            }

        }
    });
})


// app.post('/editClasses', function (req, response) {
//    console.log("req",req)
//     var url = 'mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
//     // First read existing users.
//     //  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//     //     data = JSON.parse( data );
//     //     data["user4"] = user["user4"];
//     //     console.log( data );
//     //     res.end( JSON.stringify(data));
//     //  });
//     var data={'name':'red apples'}
//     MongoClient.connect(url, function (err, client) {
//         if (err) {
//            // console.log(err)
//         } else {
//             console.log('Connected to', url)
//             var db = client.db('students')
//             var collection = db.collection('algebra');
//             var myquery = { _id: req.body[0]._id };
//             var newvalues = { $set: req.body[0]  };
//             collection.updateMany(myquery, newvalues, function (err, res) {
//                 if (err) {
//                    // console.log(err)
//                 } else {
//                     console.log("doc inserted", res.insertedCount, res)
//                     response.end(JSON.stringify(res));
//                     collection.find().toArray( function (err, res) {
//                         if (err) {
//                       //      console.log(err)
//                         } else {
//                        //     console.log("doc inserted", res.insertedCount, res)
//                             response.end(JSON.stringify(res));
//                         }
        
//                     });
        
//                 }
//                 client.close();

//             });
          
//         }
//     });
// })


app.get('/filterClass', function (req, response) {
    // First read existing users.
    // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //    var users = JSON.parse( data );
    //    var user = users["user" + req.params.id] 
    //    console.log( user );
    //    res.end( JSON.stringify(user));
    // });
    console.log(req.body)
    var url = 'mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            console.log('Connected to', url)
            var db = client.db('students')
            var collection = db.collection('algebra');
            collection.find(req.body).toArray(function (err, res) {
                if (err) {
                    console.log(err)
                } else if (res.length) {
                    console.log("doc find", res)
                    response.end(JSON.stringify(res));
                } else {
                    console.log('No Matches Found')
                }
                client.close();

            });

        }
    });
})



app.post('/deletePost', function (req, response) {
    console.log(req.body)
    var  id=''
    if(req.body._id){
       var  id=mongoose.Types.ObjectId(req.body._id)
    }
    var url = 'mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            // console.log('Connected to',  req.body._id,mongoose.Types.ObjectId(req.body._id))
            var db = client.db('students')
            var collection = db.collection('algebra');
            collection.deleteOne({"_id":id}, function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(res)
                    response.end(JSON.stringify(res));
                }
                client.close();

            });

        }
    });
})


var server = app.listen(process.env.PORT || 8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})