"use strict";

const express = require("express");
const app = express();

const bars = require("./bars");

app.get("/", (req, res) => {
	res.send({ msg: "Server is up and running!" });
});

// Endpoints
app.use("/bars", bars);

// Custom 404 (not found) error handler
app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Custom error handler
app.use((err, req, res, next) => {
	// console.error(err);
	if (err.status) {
		const errBody = {
			...err,
			message: err.message
		};
		res.status(err.status).json(errBody);
	} else {
		res.status(500).json({
			message: "Internal Server Error"
		});
	}
});

module.exports = app;
