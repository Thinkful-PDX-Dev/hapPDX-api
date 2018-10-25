"use strict";

//requires express and creates instance of it in same line
const routeApp = require("express")();

// Sanity Check
routeApp.get("/", (req, res) => {
	res.send({ message: "Server is up and running" });
});

module.exports = routeApp;
