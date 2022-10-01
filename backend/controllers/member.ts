import crypto from "crypto";
import { Request, Response } from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import mongoose from "mongoose";
import Booking from "../models/Booking";
import Property from "../models/Property";
import { property404Error } from "../utils/constant";
import { getErrorMessage } from "../utils/error";

export async function getLanding(__: Request, res: Response) {
  const travelersPromise = Booking.find({
    "payment.status": "Accepted",
  })
    .distinct("member.email")
    .countDocuments();

  const treasuresPromise = Property.aggregate<{ count: number }>()
    .unwind("$activities")
    .count("count");

  const citiesPromise = Property.find().distinct("city").countDocuments();

  const mostPickedPromise = Property.aggregate()
    .lookup({
      from: "bookings",
      localField: "_id",
      foreignField: "property.current",
      as: "propertyBookings",
    })
    .addFields({
      sumBookings: { $size: "$propertyBookings" },
    })
    .sort({
      sumBookings: -1,
    })
    .limit(5)
    .project({
      title: true,
      city: true,
      country: true,
      unit: true,
      imageUrl: { $first: "$imageUrls" },
      price: { $convert: { input: "$price", to: "double" } },
    });

  const categoriesPromise = Property.aggregate()
    .addFields({
      imageUrl: { $first: "$imageUrls" },
    })
    .lookup({
      from: "bookings",
      localField: "_id",
      foreignField: "property.current",
      as: "propertyBookings",
    })
    .addFields({
      sumBookings: { $size: "$propertyBookings" },
    })
    .sort({
      sumBookings: -1,
    })
    .lookup({
      from: "categories",
      localField: "category",
      foreignField: "_id",
      as: "category",
    })
    .group({
      _id: "$category._id",
      name: { $first: "$category.name" },
      properties: { $push: "$$ROOT" },
    })
    .project({
      _id: { $first: "$_id" },
      name: { $first: "$name" },
      properties: { $slice: ["$properties", 4] },
    })
    .project({
      name: true,
      properties: {
        _id: true,
        title: true,
        city: true,
        country: true,
        isPopular: true,
        imageUrl: true,
      },
    });

  const TESTIMONIAL = Object.freeze({
    _id: crypto.randomUUID(),
    imageUrl: "/images/testimonial-landing-page.seed.jpg",
    name: "Happy Family",
    rate: 4.55,
    content:
      "What a great trip with my family and I should try again next time soon ...",
    familyName: "Angga",
    familyOccupation: "Product Designer",
  });

  try {
    const [travelerCount, treasureResult, cityCount, mostPicked, categories] =
      await Promise.all([
        travelersPromise,
        treasuresPromise,
        citiesPromise,
        mostPickedPromise,
        categoriesPromise,
      ]);

    const treasures = treasureResult.at(0) ?? { count: 0 };

    res.status(StatusCodes.OK).json({
      hero: {
        travelerCount,
        treasureCount: treasures.count,
        cityCount,
      },
      mostPicked,
      categories,
      testimonial: TESTIMONIAL,
    });
  } catch (maybeError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getErrorMessage(maybeError) });
  }
}

export async function getProperty(req: Request<{ id: string }>, res: Response) {
  try {
    const property = await Property.findById(req.params.id).orFail(
      property404Error
    );

    const TESTIMONIAL = Object.freeze({
      _id: "291850b1-e2a2-4675-ab27-a990f7e82173",
      imageUrl: "/images/testimonial-property-details.seed.jpg",
      name: "Happy Family",
      rate: 4,
      content:
        "What a great trip with my family and I should try again and again next time soon...",
      familyName: "Angga",
      familyOccupation: "UI Designer",
    });

    res
      .status(StatusCodes.OK)
      .json({ ...property.toJSON(), testimonial: TESTIMONIAL });
  } catch (maybeError) {
    if (createHttpError.isHttpError(maybeError)) {
      res.status(maybeError.statusCode).json({ error: maybeError });
      return;
    }

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: { message: getErrorMessage(maybeError) } });
  }
}

type AddBookingReqBody = {
  startDate: string;
  endDate: string;
  nights: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyId: string;
  price: number;
  originBankName: string;
  accountHolderName: string;
};

export async function addBooking(
  req: Request<{ id: string }, unknown, AddBookingReqBody>,
  res: Response
) {
  try {
    await Booking.create({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      nights: req.body.nights,
      member: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
      },
      property: {
        current: req.body.propertyId,
        price: req.body.price,
      },
      payment: {
        imageProofUrl: _.isObject(req.file)
          ? `/images/${req.file.filename}`
          : undefined,
        originBankName: req.body.originBankName,
        accountHolderName: req.body.accountHolderName,
      },
    });

    res.status(StatusCodes.CREATED).json({ message: "Property booked" });
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: maybeError.errors });
      return;
    }

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: { message: getErrorMessage(maybeError) } });
  }
}

export async function getTest(__: Request, res: Response) {
  const response = new createHttpError.ImATeapot();
  res.status(response.statusCode).json(response);
}
