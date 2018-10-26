"use strict";

const express = require("express");
const app = express();

const bars = require("./bars");

app.get("/", (req, res) => {
	res.send({ msg: "Server is up and running!" });
});

// Endpoints
app.use("/bars", bars);

module.exports = app;
