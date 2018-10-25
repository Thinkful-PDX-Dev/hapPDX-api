"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../server");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Mocha and Chai", () => {
	it("should be properly setup", () => {
		expect(true).to.be.true;
	});
});
