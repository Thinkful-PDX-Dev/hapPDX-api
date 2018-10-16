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

	describe("GET /bars", () => {
		it("Should return a list of bars", () => {
			return Promise.all([chai.request(app).get("/bars"), Bar.find()]).then(
				([res, data]) => {
					res.body.forEach((bar, index) => {
						expect(bar).to.be.an("object");
						expect(bar).to.contain.keys("id", "name", "address", "hours");

						expect(bar.id).to.equal(data[index].id);
						expect(bar.name).to.equal(data[index].name);
						expect(bar.address).to.equal(data[index].address);
						expect(bar.hours).to.equal(data[index].hours);
					});
				}
			);
		});
	});
});
