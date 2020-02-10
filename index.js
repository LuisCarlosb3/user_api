const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3030;

const userRoutes = require("./userRoutes");
const database = require("./database");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(userRoutes);
database.connectDatabase().then(() => {
  app.listen(3030, () => {
    console.log("node server at port 3030");
  });
});
