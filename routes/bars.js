"use strict";

const express = require("express");
// const app = express();

const Bar = require("../models");

const router = express.Router();

//get data for all bars
router.get("/", (req, res, next) => {
	Bar.find()
		.then(results => {
			//serialize each response
			res.json(results.map(bar => bar.serialize()));
			// res.json(results);
		})
		//passes error on to error handler in routes/index.js
		.catch(err => next(err));
});

//get data for single bar by id
router.get("/:id", (req, res, next) => {
	Bar.findById(req.params.id)
		.then(bar => {
			res.json(bar.serialize());
		})
		//passes error on to error handler in routes/index.js
		.catch(err => next(err));
});

//post bar data
router.post("/", (req, res, next) => {
	//required fields for post
	let requiredFields = ["name", "address", "hours"];
	//check if each required field is present. If a field is not present, return an error message
	for (var i = 0; i < requiredFields.length; i++) {
		let field = requiredFields[i];
		if (!field) {
			return res.status(400).json({ error: "missing field in request body" });
		}
	}
	//create new data object
	Bar.create({
		name: req.body.name,
		address: req.body.address,
		hours: req.body.hours,
		description: req.body.description,
		neighborhood: req.body.neighborhood,
		phone: req.body.phone,
		rating: req.body.rating,
		review: req.body.review,
		link: req.body.link,
		img: req.body.img,
		patio: req.body.patio
	})
		.then(newBar => {
			res.status(201).json(newBar.serialize());
		})
		//passes error on to error handler in routes/index.js
		.catch(err => next(err));
});

//update bar data object
router.put("/:id", (req, res, next) => {
	const { id } = req.params;
	let {
		name,
		address,
		hours,
		description,
		neighborhood,
		phone,
		rating,
		review,
		price,
		link,
		img,
		patio
	} = req.body;

	const updateBar = {};

	if (name) updateBar.name = name;
	if (address) updateBar.address = address;
	if (hours) updateBar.hours = hours;
	if (description) updateBar.description = description;
	if (neighborhood) updateBar.neighborhood = neighborhood;
	if (phone) updateBar.phone = phone;
	if (rating) updateBar.rating = rating;
	if (review) updateBar.review = review;
	if (price) updateBar.price = price;
	if (link) updateBar.link = link;
	if (img) updateBar.img = img;
	if (patio) updateBar.patio = patio;

	Bar.findByIdAndUpdate({ _id: id }, updateBar, { new: true })
		.then(result => {
			res.status(201).json(result);
		})
		//passes error on to error handler in routes/index.js
		.catch(err => next(err));
});

//delete bar data object
router.delete("/:id", (req, res, next) => {
	Bar.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).json({ message: "success, my friend!" });
		})
		//passes error on to error handler in routes/index.js
		.catch(err => next(err));
});

module.exports = router;
