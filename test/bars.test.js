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

	describe("GET /bars/:id", () => {
		it("Should correctly return one bar", () => {
			let barData;
			return Bar.findOne()
				.then(res => {
					barData = res;
					return chai.request(app).get(`/bars/${barData.id}`);
				})
				.then(res => {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.be.an("object");
					expect(res.body).to.contain.keys("id", "name", "address", "hours");

					expect(res.body.id).to.equal(barData.id);
					expect(res.body.name).to.equal(barData.name);
					expect(res.body.address).to.equal(barData.address);
					expect(res.body.hours).to.equal(barData.hours);
				});
		});
	});

	describe("POST /bars", () => {
		it("Should return a new bar when given valid inputs", () => {
			const newBar = {
				name: "Bar",
				address: "123 Easy St",
				hours: "Open 24/7"
			};
			let body;

			return chai
				.request(app)
				.post("/bars")
				.send(newBar)
				.then(res => {
					body = res.body;
					expect(res).to.have.status(201);
					expect(res).to.be.json;
					expect(body).to.be.an("object");
					expect(res.body).to.contain.keys("id", "name", "address", "hours");
					return Bar.findById(body.id);
				})
				.then(data => {
					expect(body.id).to.equal(data.id);
					expect(body.name).to.equal(data.name);
					expect(body.address).to.equal(data.address);
					expect(body.hours).to.equal(data.hours);
				});
		});
	});
});
