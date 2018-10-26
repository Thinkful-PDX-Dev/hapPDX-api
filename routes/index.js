"use strict";

const express = require("express");
const app = express();

const bars = require("./bars");

app.get("/", (req, res) => {
	res.send({ msg: "Server is up and running!" });
});

module.exports = app;
