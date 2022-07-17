const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/db.config");

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node Server Listening on ${port}`));
