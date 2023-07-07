require('dotenv').config()
const express = require("express");
const cors = require("cors");
const includeRoutes = require("./routers");

const app = express();

app.use(cors());
app.use(express.json());

includeRoutes(app);

module.exports = app;
