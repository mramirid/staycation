import crypto from "crypto";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Booking from "../models/Booking";
import Property from "../models/Property";
import { catchError } from "../utils/error";

export async function getTest(__: Request, res: Response) {
  res.status(StatusCodes.OK).json({});
}

export async function getLandingPage(__: Request, res: Response) {
  const travelersPromise = Booking.find({
    "payment.status": "Accepted",
  })
    .distinct("member.email")
    .countDocuments();

  const treasuresPromise = Property.aggregate()
    .unwind("$activities")
    .count("value");

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
    const [travelers, [treasures], cities, mostPicked, categories] =
      await Promise.all([
        travelersPromise,
        treasuresPromise,
        citiesPromise,
        mostPickedPromise,
        categoriesPromise,
      ]);

    res.status(StatusCodes.OK).json({
      hero: { travelers, treasures: treasures.value, cities },
      mostPicked,
      categories,
      testimonial: TESTIMONIAL,
    });
  } catch (maybeError) {
    const error = catchError(maybeError);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
