var express = require('express');
var cors = require('cors')
var app = express();
var mongodb = require('mongodb')
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
    console.log("its inside")
    var url ='mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
    // First read existing users.
    //  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //     data = JSON.parse( data );
    //     data["user4"] = user["user4"];
    //     console.log( data );
    //     res.end( JSON.stringify(data));
    //  });
    console.log("Request", req.body)
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            console.log('Connected to', url)
            var db = client.db('students')
            var collection = db.collection('algebra');
            // var doc = { title: 'red apples', description: 'red' };
            // var docs = []
            // docs.push(req.body)
            collection.insertMany(req.body, function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("doc inserted", res.insertedCount)
                    if(res.insertedCount == 1){
                        const body = {"message":'Success'};
    
                        // Calling response.writeHead method
                        response.writeHead(200, {
                          'Content-Length': Buffer.byteLength(body),
                          'Content-Type': 'text/plain'
                        });
                          
                        response.end(body);
                    }
                    response.end(JSON.stringify(res));
                }
                client.close();

            });

        }
    });
});


app.post('/editClasses', function (req, response) {
    console.log(req)
    var url = 'mongodb+srv://snallari:Sairam90@cluster0.iqgwh.mongodb.net/test'
    // First read existing users.
    //  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //     data = JSON.parse( data );
    //     data["user4"] = user["user4"];
    //     console.log( data );
    //     res.end( JSON.stringify(data));
    //  });
    var data={'name':'red apples'}
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            console.log('Connected to', url)
            var db = client.db('students')
            var collection = db.collection('algebra');
            collection.updateMany(req.body, {$set: {'title':'Algebra 1'}}, function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("doc inserted", res.insertedCount, res)
                    //response.end(JSON.stringify(res));
                    collection.find().toArray( function (err, res) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("doc inserted", res.insertedCount, res)
                            response.end(JSON.stringify(res));
                        }
                        client.close();
        
                    });
        
                }

            });
          
        }
    });
})


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


// app.get('/', function(req, res){
//     console.log("its inside")
//     res.send({ title: 'Sai' });
// });

var server = app.listen(process.env.PORT || 8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})