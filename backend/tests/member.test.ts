import chai from "chai";
import chaiHttp from "chai-http";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import mongoose from "mongoose";
import app from "../app";
import { PropertyDoc } from "../models/Property";
import { seed } from "../seeds";
import { mongoUri } from "../utils/constant";

chai.use(chaiHttp);

describe("Member API", () => {
  let property: PropertyDoc;

  before(async () => {
    await mongoose.connect(mongoUri);

    const seedResult = await seed();
    property = seedResult.properties.tabbyTown;
  });

  after(() => mongoose.connection.dropDatabase());

  describe("Landing Page API", () => {
    before(() => mongoose.connect(mongoUri));

    it("GET the landing page data", (done) => {
      chai
        .request(app)
        .get("/api/v1/member/landing")
        .end((maybeError, res) => {
          chai.expect(_.isError(maybeError)).to.be.false;
          chai.expect(res).to.have.status(StatusCodes.OK);

          chai.expect(res.body).to.be.an("object");
          chai
            .expect(res.body.hero)
            .to.have.all.keys("travelerCount", "treasureCount", "cityCount");
          chai.expect(res.body.mostPicked).to.be.an("array");
          chai.expect(res.body.categories).to.be.an("array");
          chai.expect(res.body.testimonial).to.be.an("object");

          done();
        });
    });
  });

  describe("Property Detail API", () => {
    it("GET a property detail data", (done) => {
      chai
        .request(app)
        .get(`/api/v1/member/properties/${property.id}`)
        .end((maybeError, res) => {
          chai.expect(_.isError(maybeError)).to.be.false;
          chai.expect(res).to.have.status(StatusCodes.OK);

          chai.expect(res.body).to.be.an("object");
          chai.expect(res.body._id).to.be.a("string");
          chai.expect(res.body.title).to.be.a("string");
          chai.expect(res.body.price).to.be.a("number");
          chai.expect(res.body.unit).to.be.a("string");
          chai.expect(res.body.city).to.be.a("string");
          chai.expect(res.body.isPopular).to.be.a("boolean");
          chai.expect(res.body.description).to.be.a("string");
          chai.expect(res.body.imageUrls).to.be.an("array");
          chai.expect(res.body.features).to.be.an("array");
          chai.expect(res.body.activities).to.be.an("array");
          chai.expect(res.body.testimonial).to.be.an("object");

          done();
        });
    });
  });
});
