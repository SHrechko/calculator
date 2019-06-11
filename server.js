const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.static(path.resolve("./client/build")));
app.get("/", (req, response) => {
  fs.readFile("./client/build/index.html", function(err, html) {
    if (err) {
      throw err;
    }
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(html);
    response.end();
  });
});

// create a GET route
app.post("/calculate", (req, res) => {
  try {
    resOperation = eval(req.body.value).toString();
  } catch (e) {
    if (e instanceof SyntaxError) {
      res.send({ calcValue: e.message });
    }
  }
  res.send({ calcValue: resOperation });
});
