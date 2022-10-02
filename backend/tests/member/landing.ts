import chai from "chai";
import chaiHttp from "chai-http";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import mongoose from "mongoose";
import app from "../../app";
import { mongoUri } from "../../utils/constant";

chai.use(chaiHttp);

describe("Landing Page API Testing", () => {
  before((done) => {
    mongoose.connect(mongoUri, (error) => {
      if (_.isError(error)) {
        done(error);
        return;
      }
      done();
    });
  });

  it("GET the landing page data", (done) => {
    chai
      .request(app)
      .get("/api/v1/member/landing")
      .end((maybeError, res) => {
        chai.expect(_.isError(maybeError)).to.be.false;

        chai.expect(res).to.have.status(StatusCodes.OK);
        chai.expect(res.body).to.be.an("Object");

        chai.expect(res.body).to.have.property("hero");
        chai
          .expect(res.body.hero)
          .to.have.all.keys("travelerCount", "treasureCount", "cityCount");

        chai.expect(res.body).to.have.property("mostPicked");
        chai.expect(res.body.mostPicked).to.have.an("array");

        chai.expect(res.body).to.have.property("categories");
        chai.expect(res.body.categories).to.have.an("array");

        chai.expect(res.body).to.have.property("testimonial");
        chai.expect(res.body.testimonial).to.have.an("Object");

        done();
      });
  });
});
