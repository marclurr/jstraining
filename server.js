var express = require("express");
var fs = require("fs");
var async = require("async");
var data = require("./data");

var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.use("/css", express.static(__dirname + "/css"));
app.use("/html", express.static(__dirname + "/html"));
app.use("/js", express.static(__dirname + "/js"));
app.use(express.static(__dirname + "/public"));

function isJson(file) {
  return /json$/.test(file);
}

function loadRecord(file, callback) {
  fs.readFile(file, "utf8", function(err, text) {
    var item = JSON.parse(text);
    console.log(item);
    callback(null, item);
  });
}

app.get("/animals", function(req,res) {
  data.all("animals", function(err, data) {
    res.send({items: data});
  });
});

app.get("/animals/:id", function(req,res) {
  data.get("animals", req.params.id, function(err, data) {
    if (err) {
      if (err.errno === 34) {
        res.send(404);
      } else {
        res.send(500);
      }
    } else {
      res.send(data);
    }
  })
});

app.post("/animals", function(req,res) {
  var animal = req.body;
  data.add("animals", animal, function(err, data) {
    if (err) {
      res.send(500);
    } else {
      res.status(201);
      res.set("Location", "/animals/" + animal.id)
      res.send(data);
    }
  });
});

app.put("/animals", function(req,res) {
  var animal = req.body;
  data.update("animals", animal, function(err, data) {
    if (err) {
      res.send(500);
    } else {
      res.send(200);
    }
  });
});

app.listen(3000);