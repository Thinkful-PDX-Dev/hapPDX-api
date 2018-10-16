"use strict";

const { app } = require("../server"),
	chai = require("chai"),
	chaiHttp = require("chai-http"),
	mongoose = require("mongoose");

const { TEST_DATABASE_URL } = require("../config");

const Bar = require("../models"),
	seedBars = require("../seed-data.json");

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing "/bars" endpoints', () => {
	before(() => {
		return mongoose
			.connect(TEST_DATABASE_URL)
			.then(() => mongoose.connection.db.dropDatabase());
	});

	beforeEach(() => {
		return Bar.insertMany(seedBars);
	});

	afterEach(() => {
		return mongoose.connection.db.dropDatabase();
	});

	after(() => {
		return mongoose.disconnect();
	});
});
