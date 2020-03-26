const dotenv = require('dotenv').config();
console.log(process.env.MONGO_URL); //you can access it straight way

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;
const articlesRouter = require("./routes/articles");
const router = express.Router();
const mongoose = require('mongoose')

require("./configs/mongoose.config");

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/articles", articlesRouter);
app.listen(port, function() {
  console.log("Runnning on " + port);
});

module.exports = app;