import _ from "lodash";
import mongoose from "mongoose";
import Bank from "../models/Bank";
import Booking from "../models/Booking";
import Category from "../models/Category";
import Property from "../models/Property";
import User from "../models/User";
import { mongoUri } from "../utils/constant";

mongoose.connect(mongoUri, async (error) => {
  if (_.isError(error)) {
    throw new Error("Failed to connect to MongoDB", { cause: error });
  }

  try {
    console.log("Dropping the database...");
    await mongoose.connection.dropDatabase();
    console.log("The database has been dropped");

    console.log("Seeding...");
    await seed();
    console.log("Done");
  } catch (maybeError) {
    throw new Error("Seeding failed", { cause: maybeError });
  } finally {
    await mongoose.connection.close();
  }
});

async function seed() {
  const [houses] = await Category.insertMany([
    { name: "Houses with beauty backyard" },
    { name: "Hotels with large living room" },
    { name: "Apartment with kitchen" },
  ]);

  const [tabbyTown, seattleRain] = await Property.insertMany([
    {
      title: "Tabby Town",
      price: new mongoose.Types.Decimal128("12"),
      city: "Lampung",
      country: "Indonesia",
      isPopular: true,
      category: houses._id,
      description:
        "<p>Labore gubergren consetetur qui hendrerit no takimata est invidunt. Est sit nonumy. Dolor clita justo ut et sea labore ut ea stet labore dolor suscipit. Takimata erat ut iriure odio accusam magna blandit kasd eu et rebum facilisi nulla ullamcorper exerci consetetur at. Ea dolores nostrud takimata sanctus et accusam duis praesent amet magna amet dolore adipiscing clita lorem nulla. Sadipscing ipsum sit feugait clita sit est aliquyam dolore qui sed feugait et justo minim. No dolor wisi est lorem vel duis sed sanctus. Magna dolor tation quis doming id dolores tempor labore elitr et sanctus et. Dolor duo facilisis et eos no et kasd vero justo sed dolor. Dolor lorem nonummy autem kasd esse accusam accusam sea. Takimata vero zzril hendrerit labore invidunt qui feugait. Accusam sanctus lorem diam duo rebum. Dolor justo et feugait mazim. Sed elitr ea consequat eirmod. Eos velit dolor nonumy exerci vero molestie dolor suscipit ut eirmod eros erat sadipscing eirmod aliquyam imperdiet. Vel quis nisl sadipscing placerat qui amet lorem et et nulla et nonummy magna ipsum facilisis ut dolores. Consectetuer diam stet no et consetetur nonummy illum feugiat tempor lorem amet dolor ea et ipsum iriure suscipit nulla. &nbsp;</p><p>Assum sed lorem praesent luptatum dolor takimata velit vero aliquyam facilisi consequat clita gubergren et. Et lorem lorem kasd nonumy sed clita accusam. Dolore at minim aliquam tincidunt dolores sanctus diam sit ipsum eos euismod imperdiet duo voluptua. Consetetur luptatum laoreet feugait rebum.</p>",
      imageUrls: [
        "/images/property-details-1.seed.png",
        "/images/property-details-2.seed.png",
        "/images/property-details-3.seed.png",
      ],
      features: [
        {
          name: "televison",
          quantity: 12,
          iconUrl: "/images/feature-television.seed.png",
        },
        {
          name: "bedroom",
          quantity: 2,
          iconUrl: "/images/feature-bedroom.seed.png",
        },
        {
          name: "living room",
          quantity: 23,
          iconUrl: "/images/feature-living-room.seed.png",
        },
        {
          name: "mb/s",
          quantity: 5,
          iconUrl: "/images/feature-wifi.seed.png",
        },
        {
          name: "unit ready",
          quantity: 4,
          iconUrl: "/images/feature-ac.seed.png",
        },
        {
          name: "refrigerator",
          quantity: 6,
          iconUrl: "/images/feature-refrigerator.seed.png",
        },
        {
          name: "bathroom",
          quantity: 2,
          iconUrl: "/images/feature-bathroom.seed.png",
        },
        {
          name: "dining room",
          quantity: 1,
          iconUrl: "/images/feature-dining-room.seed.png",
        },
      ],
      activities: [
        {
          name: "Green Lake",
          type: "Nature",
          imageUrl: "/images/activity-nature.seed.png",
        },
        {
          name: "Water Polo",
          type: "Pool",
          imageUrl: "/images/activity-water-polo.seed.jpg",
        },
        {
          name: "Labour and Wait",
          type: "Shopping",
          imageUrl: "/images/activity-shopping.seed.png",
        },
        {
          name: "Snorkeling",
          type: "Beach",
          imageUrl: "/images/activity-beach.seed.png",
        },
      ],
    },
    {
      title: "Seattle Rain",
      price: new mongoose.Types.Decimal128("19.99"),
      city: "Bandung",
      country: "Indonesia",
      category: houses._id,
      description:
        "<p>Ea accusam magna exerci eirmod lorem sit eirmod ut amet voluptua possim dolor enim option invidunt nostrud sit. Aliquyam voluptua rebum. Hendrerit justo magna sanctus amet hendrerit ipsum magna est et aliquyam dolore nulla ut elitr accusam ut. Invidunt lorem aliquyam est lorem est clita clita accusam stet erat. Sit iusto magna eos laoreet nulla consectetuer elit consequat delenit dolore invidunt accusam dolores labore lorem duo. Ut at molestie erat at rebum sadipscing tempor et aliquam diam dolore consequat vulputate ut sadipscing lorem.</p><p>Et magna ut ut dolore nulla hendrerit ipsum et et ea accusam clita sadipscing iusto sanctus. Dolore laoreet lorem takimata erat dolor tempor rebum accusam. Sadipscing hendrerit labore erat augue. Amet dolor dolor adipiscing hendrerit commodo lorem sit. Suscipit est est commodo enim tation. Duis lorem dolore sit sadipscing diam sadipscing sit magna consetetur quis diam iriure sadipscing justo est tempor erat kasd. Justo dolore kasd amet eos congue stet aliquyam dolore dolore amet voluptua rebum erat sit. Sit dolor praesent. Diam sanctus in erat elitr voluptua diam labore ipsum. Duo justo lorem consetetur amet labore no eirmod diam minim dolore laoreet labore ipsum te adipiscing. Dolore vel nonumy sea eos clita consectetuer gubergren rebum vero.</p>",
      imageUrls: [
        "/images/property-details-3.seed.png",
        "/images/property-details-1.seed.png",
        "/images/property-details-2.seed.png",
      ],
      features: [
        {
          name: "bedroom",
          quantity: 2,
          iconUrl: "/images/feature-bedroom.seed.png",
        },
        {
          name: "televison",
          quantity: 12,
          iconUrl: "/images/feature-television.seed.png",
        },
        {
          name: "refrigerator",
          quantity: 6,
          iconUrl: "/images/feature-refrigerator.seed.png",
        },
        {
          name: "living room",
          quantity: 23,
          iconUrl: "/images/feature-living-room.seed.png",
        },
        {
          name: "dining room",
          quantity: 1,
          iconUrl: "/images/feature-dining-room.seed.png",
        },
        {
          name: "unit ready",
          quantity: 4,
          iconUrl: "/images/feature-ac.seed.png",
        },
        {
          name: "bathroom",
          quantity: 2,
          iconUrl: "/images/feature-bathroom.seed.png",
        },
        {
          name: "mb/s",
          quantity: 5,
          iconUrl: "/images/feature-wifi.seed.png",
        },
      ],
      activities: [
        {
          name: "Labour and Wait",
          type: "Shopping",
          imageUrl: "/images/activity-shopping.seed.png",
        },
        {
          name: "Snorkeling",
          type: "Beach",
          imageUrl: "/images/activity-beach.seed.png",
        },
        {
          name: "Water Polo",
          type: "Pool",
          imageUrl: "/images/activity-water-polo.seed.jpg",
        },
        {
          name: "Green Lake",
          type: "Nature",
          imageUrl: "/images/activity-nature.seed.png",
        },
      ],
    },
  ]);

  const insertBanksPromise = Bank.insertMany([
    {
      name: "Bank Syariah Indonesia",
      logoUrl: "/images/bsi-logo.seed.png",
      accountNumbers: "22081544",
      accountHolderName: "Amir Muhammad Hakim",
    },
    {
      name: "Bank Syariah Mandiri",
      logoUrl: "/images/mandiri-syariah-logo.seed.png",
      accountNumbers: "77542493",
      accountHolderName: "Muhammad Avdol",
    },
  ]);

  const insertBookingsPromise = Booking.insertMany([
    {
      startDate: new Date(2022, 0, 20),
      endDate: new Date(2022, 0, 22),
      nights: 3,
      member: {
        firstName: "Elfin",
        lastName: "Sanjaya",
        email: "elfinsanjaya12@gmail.com",
        phone: "082377954008",
      },
      property: {
        current: tabbyTown._id,
        price: tabbyTown.price,
      },
      payment: {
        imageProofUrl: "/images/payment-proof-1.seed.jpeg",
        originBankName: "BTPN Syariah",
        accountHolderName: "Ismail Ahmad Kanabawi",
      },
    },
    {
      startDate: new Date(2022, 4, 15),
      endDate: new Date(2022, 5, 10),
      nights: 27,
      member: {
        firstName: "Yein",
        lastName: "Narayana",
        email: "yein.narayana@gmail.com",
        phone: "082377954008",
      },
      property: {
        current: seattleRain._id,
        price: seattleRain.price,
      },
      payment: {
        imageProofUrl: "/images/payment-proof-2.seed.jpeg",
        originBankName: "Bank Syariah Indonesia",
        accountHolderName: "Khalid Kashmiri",
      },
    },
  ]);

  const createUserPromise = User.create({
    username: "mramirid",
    password: "jajaja",
  });

  await Promise.all([
    insertBanksPromise,
    insertBookingsPromise,
    createUserPromise,
  ]);
}
