var express = require('express');
var cors = require('cors')
var app = express();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

app.use(express.json());
var MongoClient = mongodb.MongoClient
const user = require("./src/routes/user");
const InitiateMongoServer = require("./src/config/db");

app.use(cors())
app.options('*', cors())

app.get('/listClasses', function (req, respo) {
  console.log("its inside")
  var url = 'mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log("error", err)
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
});

app.post('/addClasses', function (req, response) {
  var url = 'mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to', url)
      console.log("its inside", req.body)
      var db = client.db('students')
      var collection = db.collection('algebra');
      if ((req.body && req.body._id === undefined)) {
        collection.insertOne(req.body, function (err, res) {
          if (err) {
            response.end(JSON.stringify(err));
          } else {
            console.log("doc insert", res.insertedCount);
            response.end(JSON.stringify(res));
          }
          client.close();
        });
      } else {
        console.log('Connected to update sai', req.body)
        var myquery = { _id: mongoose.Types.ObjectId(req.body._id) };
        var query = req;
        delete query.body._id;
        var newvalues = { $set: query.body };
        console.log(myquery, newvalues)
        collection.updateOne(myquery, newvalues, function (err, res) {
          if (err) {
            response.end(JSON.stringify(err));
          } else {
            console.log("doc updated", res);
            response.end(JSON.stringify(res));
            collection.find().toArray(function (err, res) {
              if (err) {
                response.end(JSON.stringify(err));
              } else {
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


app.post('/addFav', function (req, response) {
  var url = 'mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to', url)
      console.log("its inside", req.body)
      var db = client.db('students')
      var collection = db.collection('algebra');
      var myquery = { _id: mongoose.Types.ObjectId(req.body._id) };
      var query = req;
      delete query.body._id;
      var newvalues = { $set: query.body };
      console.log(myquery, newvalues)
      collection.updateMany(myquery, newvalues, function (err, res) {
        if (err) {
          response.end(JSON.stringify(err));
        } else {
          console.log("doc updated", res);
          response.end(JSON.stringify(res));
          collection.find().toArray(function (err, res) {
            if (err) {
              response.end(JSON.stringify(err));
            } else {
              response.end(JSON.stringify(res));
            }
          });
        }
        client.close();
      });

    }
  });
})



app.post('/filterClass', function (req, response) {
  console.log(req.body)
  var url = 'mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to', url)
      var db = client.db('students')
      var collection = db.collection('algebra');
      var newvalues = { $set: req.body };
      collection.findOne({"email":req.body.email}, function (err, res) {
        if (err) {
          response.end(JSON.stringify(res));
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




app.post('/login', function (req, response) {
  console.log(req.body)
  var url = 'mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to', url)
      var db = client.db('students')
      var collection = db.collection('algebra');
      collection.findOne({"email":req.body.email} ,function (err, res) {
        if (err) {
          response.end(JSON.stringify(err));
        } else {
          if (res === undefined) {
            console.log(err)
          } else {
            // console.log("doc find", res)
            // response.end(JSON.stringify(res));
            jwt.sign({
              data: req.body
            }, 'secret', { expiresIn: '1h' }, function (err, token) {
              var data2 = {
                'accessToken': token
              }
              console.log("saidata", data2)
              response.end(JSON.stringify(data2));
            });
          }

        }
        client.close();

      });

    }
  });
})

app.post('/deletePost', function (req, response) {
  console.log(req.body)
  var id = ''
  if (req.body._id) {
    var id = mongoose.Types.ObjectId(req.body._id)
  }
  var url = 'mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log(err)
    } else {
      // console.log('Connected to',  req.body._id,mongoose.Types.ObjectId(req.body._id))
      var db = client.db('students')
      var collection = db.collection('algebra');
      collection.deleteOne({ "_id": id }, function (err, res) {
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

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/user", user);


var server = app.listen(process.env.PORT || 8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})