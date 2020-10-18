const { getItems, getToken, order } = require("./ncr");
var express = require("express");
var cors = require("cors");
var NlpManager = require("./NlpManager");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var nlp = new NlpManager();
var app = express();
app.use(cors());

app.get("/items", async (req, res) => {
  const r = await getItems();
  const items = await r.json();
  res.send(items);
});

app.get("/nlp/:s", async (req, res) => {
  const str = req.params["s"];
  const intents = await nlp.getIntent(str);
  res.send({
    intent: intents.intent,
  });
});

app.post("/order", jsonParser, async (req, res) => {
  const items = req.body;
  order(items.lineItems);
  res.send({ Status: "ok" });
});

var server = app.listen(3221, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
