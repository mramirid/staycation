import chai from "chai";
import chaiHttp from "chai-http";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import mongoose from "mongoose";
import path from "path";
import app from "../app";
import type { AddBookingReqBody } from "../controllers/client";
import type { PropertyDoc } from "../models/Property";
import { seed } from "../seeds";
import { mongoUri } from "../utils/constant";

chai.use(chaiHttp);

describe("Client API", () => {
  let property: PropertyDoc | undefined;

  before(async () => {
    await mongoose.connect(mongoUri);

    const seedResult = await seed();
    property = seedResult.properties["tabbyTown"];
  });

  after(() => mongoose.connection.dropDatabase());

  it("should get the landing page data", (done) => {
    chai
      .request(app)
      .get("/api/v1/client/landing")
      .end((maybeError, res) => {
        chai.expect(_.isError(maybeError)).to.be.false;
        chai.expect(res).to.have.status(StatusCodes.OK);

        chai.expect(res.body).to.be.an("object");
        chai
          .expect(res.body.heroStatistics)
          .to.have.all.keys("travelerCount", "treasureCount", "cityCount");
        chai.expect(res.body.mostPickedProperties).to.be.an("array");
        chai.expect(res.body.categories).to.be.an("array");
        chai.expect(res.body.testimonial).to.be.an("object");

        done();
      });
  });

  it("should get a property details data", (done) => {
    chai
      .request(app)
      .get(`/api/v1/client/properties/${property?.id}`)
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

  it("should record a user booking", (done) => {
    const reqBody = Object.freeze<AddBookingReqBody>({
      startDate: new Date(2022, 0, 20).toISOString(),
      endDate: new Date(2022, 0, 22).toISOString(),
      duration: 3,
      firstName: "Amir",
      lastName: "Muhammad Hakim",
      email: "amir.muh.hakim@gmail.com",
      phone: "087553445562",
      propertyId: property?.id,
      price: 5_900_000,
      originBankName: "BSI",
      accountHolderName: "Amir Muhammad Hakim",
    });

    const paymentProofFileName = "payment-proof-2.jpeg";
    const paymentProofPath = path.join(
      __dirname,
      "..",
      "seeds",
      "images",
      paymentProofFileName
    );

    chai
      .request(app)
      .post("/api/v1/client/bookings")
      .attach(
        "payment-proof",
        fs.readFileSync(paymentProofPath),
        paymentProofFileName
      )
      .field(reqBody)
      .end((maybeError, res) => {
        chai.expect(_.isError(maybeError)).to.be.false;
        chai.expect(res).to.have.status(StatusCodes.CREATED);

        chai.expect(res.body.message).eq("Property booked");

        done();
      });
  });
});
