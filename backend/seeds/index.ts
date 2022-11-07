import mongoose from "mongoose";
import Bank, { BankDoc } from "../models/Bank";
import Booking, { BookingDoc } from "../models/Booking";
import Category, { CategoryDoc } from "../models/Category";
import Property, { PropertyDoc } from "../models/Property";
import User, { UserDoc } from "../models/User";

/**
 * Fill the database with initial documents.
 * @returns The inserted documents.
 */
export async function seed(): Promise<SeedResult> {
  const houses = new Category({ name: "Houses with beauty backyard" });
  const hotels = new Category({ name: "Hotels with large living room" });
  const apartments = new Category({ name: "Apartments with kitchen" });
  await Category.insertMany([houses, hotels, apartments]);

  //* House category
  const tabbyTown = new Property({
    title: "Tabby Town",
    price: new mongoose.Types.Decimal128("12"),
    city: "Lampung",
    country: "Indonesia",
    isPopular: true,
    category: houses._id,
    description:
      "<p>Labore gubergren consetetur qui hendrerit no takimata est invidunt. Est sit nonumy. Dolor clita justo ut et sea labore ut ea stet labore dolor suscipit. Takimata erat ut iriure odio accusam magna blandit kasd eu et rebum facilisi nulla ullamcorper exerci consetetur at. Ea dolores nostrud takimata sanctus et accusam duis praesent amet magna amet dolore adipiscing clita lorem nulla. Sadipscing ipsum sit feugait clita sit est aliquyam dolore qui sed feugait et justo minim. No dolor wisi est lorem vel duis sed sanctus. Magna dolor tation quis doming id dolores tempor labore elitr et sanctus et. Dolor duo facilisis et eos no et kasd vero justo sed dolor. Dolor lorem nonummy autem kasd esse accusam accusam sea. Takimata vero zzril hendrerit labore invidunt qui feugait. Accusam sanctus lorem diam duo rebum. Dolor justo et feugait mazim. Sed elitr ea consequat eirmod. Eos velit dolor nonumy exerci vero molestie dolor suscipit ut eirmod eros erat sadipscing eirmod aliquyam imperdiet. Vel quis nisl sadipscing placerat qui amet lorem et et nulla et nonummy magna ipsum facilisis ut dolores. Consectetuer diam stet no et consetetur nonummy illum feugiat tempor lorem amet dolor ea et ipsum iriure suscipit nulla. &nbsp;</p><p>Assum sed lorem praesent luptatum dolor takimata velit vero aliquyam facilisi consequat clita gubergren et. Et lorem lorem kasd nonumy sed clita accusam. Dolore at minim aliquam tincidunt dolores sanctus diam sit ipsum eos euismod imperdiet duo voluptua. Consetetur luptatum laoreet feugait rebum.</p>",
    imageUrls: [
      "/images/property-angga-1.png",
      "/images/property-angga-2.png",
      "/images/property-angga-3.png",
    ],
    features: [
      {
        name: "televison",
        quantity: 12,
        iconUrl: "/images/feature-television.png",
      },
      {
        name: "bedroom",
        quantity: 2,
        iconUrl: "/images/feature-bedroom.png",
      },
      {
        name: "living room",
        quantity: 23,
        iconUrl: "/images/feature-living-room.png",
      },
      {
        name: "mb/s",
        quantity: 5,
        iconUrl: "/images/feature-wifi.png",
      },
      {
        name: "unit ready",
        quantity: 4,
        iconUrl: "/images/feature-ac.png",
      },
      {
        name: "refrigerator",
        quantity: 6,
        iconUrl: "/images/feature-refrigerator.png",
      },
      {
        name: "bathroom",
        quantity: 2,
        iconUrl: "/images/feature-bathroom.png",
      },
      {
        name: "dining room",
        quantity: 1,
        iconUrl: "/images/feature-dining-room.png",
      },
    ],
    activities: [
      {
        name: "Green Lake",
        type: "Nature",
        imageUrl: "/images/activity-nature.png",
      },
      {
        name: "Water Polo",
        type: "Pool",
        imageUrl: "/images/activity-water-polo.jpg",
      },
      {
        name: "Labour and Wait",
        type: "Shopping",
        imageUrl: "/images/activity-shopping.png",
      },
      {
        name: "Snorkeling",
        type: "Beach",
        imageUrl: "/images/activity-beach.png",
      },
    ],
  });
  const anggana = new Property({
    title: "Anggana",
    price: new mongoose.Types.Decimal128("39.99"),
    city: "Bogor",
    country: "Indonesia",
    category: houses._id,
    description:
      "<p>Autem sed sed vero voluptua dolores dolores tincidunt augue rebum eos vero duis nonumy dolor sanctus. Stet accusam molestie stet vero ipsum amet gubergren eirmod lorem diam. Eirmod ipsum laoreet justo vulputate sed vel erat dolor. Facilisis no sanctus ipsum dolore sea aliquyam lorem nulla at lorem sea hendrerit takimata in kasd feugait elitr et. Iusto stet sea amet vel dolore wisi in iusto amet esse. Amet voluptua quis diam ut no amet tempor dolore labore dolor ipsum tincidunt sit. Labore clita veniam tempor sea praesent. Lorem ad vel sed ipsum stet. Sanctus eu et facilisi feugiat. Amet erat dolore. Duis dolore erat nonumy aliquam diam lorem quod lorem wisi diam magna elitr takimata tincidunt. Dolor diam sit sea in sanctus sed amet aliquyam. Clita rebum no et elit velit magna nonumy esse magna tempor odio.</p><p>Lorem ea eos molestie sit sed facer no aliquyam sed at nonumy sed eos ea vel. Ut sadipscing tempor at sed amet dolore nonumy elitr. Erat et duis luptatum nulla labore at nulla eirmod praesent gubergren ipsum nonumy erat ipsum molestie minim. At duis laoreet consequat sanctus praesent tempor stet no. Takimata duo elitr commodo est nonumy justo diam ipsum amet rebum nonumy ipsum sit. Hendrerit vero erat ipsum takimata et et justo. Dolore commodo vel amet sed sed commodo invidunt vero suscipit duo. Consetetur kasd consetetur sit kasd sit magna est accumsan aliquip nostrud nibh sea aliquam consetetur option kasd dolor.</p>",
    imageUrls: [
      "/images/property-anggana.png",
      "/images/property-angga-3.png",
      "/images/property-angga-2.png",
    ],
    features: [],
    activities: [],
  });
  const seattleRain = new Property({
    title: "Seattle Rain",
    price: new mongoose.Types.Decimal128("19.99"),
    city: "Jakarta",
    country: "Indonesia",
    category: houses._id,
    description:
      "<p>Ea accusam magna exerci eirmod lorem sit eirmod ut amet voluptua possim dolor enim option invidunt nostrud sit. Aliquyam voluptua rebum. Hendrerit justo magna sanctus amet hendrerit ipsum magna est et aliquyam dolore nulla ut elitr accusam ut. Invidunt lorem aliquyam est lorem est clita clita accusam stet erat. Sit iusto magna eos laoreet nulla consectetuer elit consequat delenit dolore invidunt accusam dolores labore lorem duo. Ut at molestie erat at rebum sadipscing tempor et aliquam diam dolore consequat vulputate ut sadipscing lorem.</p><p>Et magna ut ut dolore nulla hendrerit ipsum et et ea accusam clita sadipscing iusto sanctus. Dolore laoreet lorem takimata erat dolor tempor rebum accusam. Sadipscing hendrerit labore erat augue. Amet dolor dolor adipiscing hendrerit commodo lorem sit. Suscipit est est commodo enim tation. Duis lorem dolore sit sadipscing diam sadipscing sit magna consetetur quis diam iriure sadipscing justo est tempor erat kasd. Justo dolore kasd amet eos congue stet aliquyam dolore dolore amet voluptua rebum erat sit. Sit dolor praesent. Diam sanctus in erat elitr voluptua diam labore ipsum. Duo justo lorem consetetur amet labore no eirmod diam minim dolore laoreet labore ipsum te adipiscing. Dolore vel nonumy sea eos clita consectetuer gubergren rebum vero.</p>",
    imageUrls: [
      "/images/property-seattle-rain.jpg",
      "/images/property-angga-2.png",
      "/images/property-angga-1.png",
    ],
    features: [],
    activities: [],
  });
  const woodenPit = new Property({
    title: "Wooden Pit",
    price: new mongoose.Types.Decimal128("25"),
    city: "Wonosobo",
    country: "Indonesia",
    category: houses._id,
    description:
      "<p>Duis rebum ad accumsan rebum duo lorem tincidunt. Duis rebum clita sed. Dolores amet in ipsum dolor at id ipsum duo lorem. Ea sadipscing accusam. Ipsum voluptua eos dolor erat sanctus facilisis aliquyam diam tempor. Et euismod sea sit consequat ipsum dolores amet ipsum ipsum et laoreet esse lorem at amet amet sit. Duis at gubergren accusam ipsum accusam sed kasd sed. Molestie dolore eos autem est diam et nostrud placerat augue sed dolor nonumy lorem aliquip diam. Ut vero consetetur sanctus illum clita amet est. Takimata tempor no. Iriure ea facilisi sit lorem praesent duo elitr ut no est no eos molestie te praesent erat.</p><p>Et est sanctus aliquam labore ea eirmod ipsum consequat sadipscing dolore accusam molestie amet. Ipsum diam no et esse dolor in takimata commodo blandit aliquyam sit kasd. Elitr nonumy diam sit ipsum vulputate dignissim lorem diam aliquam elit sea dolore feugiat amet. Tempor velit takimata vero dolor blandit voluptua amet duo dolore aliquyam vel diam lorem delenit justo.</p>",
    imageUrls: [
      "/images/property-wooden-pit.png",
      "/images/property-angga-1.png",
      "/images/property-angga-2.png",
    ],
    features: [],
    activities: [],
  });

  //* Hotel category
  const greenPark = new Property({
    title: "Green Park",
    price: new mongoose.Types.Decimal128("52.25"),
    city: "Tanggerang",
    country: "Indonesia",
    category: hotels._id,
    description:
      "<p>Dolor velit stet lorem magna diam nibh eos lorem volutpat accusam duis possim sit nulla esse vel elit. Eirmod nulla sadipscing sit sed labore et. Sea option eos no vero eirmod labore ipsum feugiat ipsum labore sea duis stet.</p><p>Lorem elitr ipsum sadipscing et est esse at aliquyam. Diam invidunt et no justo possim amet takimata iusto dolore voluptua duis feugait stet dolor tempor ipsum vel. Takimata consetetur sea hendrerit vero sed ut. Diam at ipsum voluptua luptatum sed veniam eum ut ut. Labore ad rebum nonumy in nisl hendrerit sed. Nonummy te laoreet laoreet et at vulputate lorem. Sit doming ex et kasd et dolore justo takimata amet labore aliquyam sit et at duis lorem ut clita. Duo ut dolores stet. Dolor esse adipiscing autem magna eos nam et clita nonumy sanctus dolores amet ut erat vero. Imperdiet magna vero ex nonumy erat ea stet at sadipscing feugiat dolores rebum kasd. Vulputate vel no et gubergren vero sanctus nonumy sed aliquyam sed voluptua duo. Ea luptatum dolores duis duis sea justo ea soluta stet. Labore et id augue sed feugait ipsum erat imperdiet amet tempor vel amet nonumy ea. Sadipscing lorem ipsum nihil dolor sit dolor kasd tincidunt clita ut dolores dolore feugait est erat sit. Vel te kasd no adipiscing nulla kasd ipsum at dolor. Sed accusam ullamcorper ea et id.</p>",
    imageUrls: [
      "/images/property-green-park.png",
      "/images/property-angga-1.png",
      "/images/property-angga-3.png",
    ],
    features: [],
    activities: [],
  });
  const podoWae = new Property({
    title: "Podo Wae",
    price: new mongoose.Types.Decimal128("79.99"),
    city: "Madiun",
    country: "Indonesia",
    category: hotels._id,
    description:
      "<p>Dolore eirmod tempor dolor duis accusam dolores elitr rebum euismod invidunt diam at vel ipsum. Est sanctus et et blandit amet laoreet dolore labore lorem et. Et justo eirmod et labore vero magna. Iriure at stet nonumy wisi labore autem eos est clita odio vero dolores labore te sanctus. Eirmod magna dolor et ipsum vel duis. Et praesent consetetur labore et sanctus ut sit magna. Sed et stet option. Lorem delenit lorem labore dolor sadipscing sanctus et sed dolore justo dolor. Duo accusam consequat magna dolor accusam voluptua dolor esse magna labore takimata. Diam odio tempor consectetuer diam eos facilisi sanctus sadipscing dolor sed gubergren accusam. Magna sed amet diam ad sadipscing clita. Diam dolor vel dolor hendrerit vero eros dolores erat et kasd voluptua consequat ut et amet elitr sed. Dolores at est ut accusam voluptua aliquyam est duis ipsum dolore praesent vel nulla gubergren.</p><p>Sit tempor dolore et stet. Eos takimata diam amet at esse esse lorem. Dolore labore stet kasd consequat eu tation voluptua. Dolor rebum illum dolore tempor erat velit placerat eirmod ipsum. Lorem dolore at est vel magna diam consetetur duis est nonumy no lorem stet sed stet sit eirmod. Lorem at clita clita dolore lorem aliquyam diam velit diam no soluta magna dolor gubergren dolor eos no.</p>",
    imageUrls: [
      "/images/property-podo-wae.jpg",
      "/images/property-angga-3.png",
      "/images/property-angga-1.png",
    ],
    features: [],
    activities: [],
  });
  const silverRain = new Property({
    title: "Silver Rain",
    price: new mongoose.Types.Decimal128("44.99"),
    city: "Bandung",
    country: "Indonesia",
    category: hotels._id,
    description:
      "<p>Luptatum stet sit vero eirmod magna tempor te sed sea tempor ipsum feugait duis eu magna velit dolore lorem. Sit lorem ea ipsum consequat eum sit. Nonumy feugiat liber duo sit clita voluptua invidunt nonumy sed rebum eos sed. Nulla sadipscing vero est magna adipiscing et labore sit. Duo est eu ad ipsum elitr voluptua et. Nonumy et dolore accusam assum aliquyam. Et mazim elitr doming te nibh nulla dolore in sanctus dolor autem veniam. Exerci amet eum sed sit et facilisis diam tempor sit rebum ullamcorper elitr. Sit amet et qui no illum diam duo dolor invidunt dolores quis vel ea diam sadipscing sit. Kasd rebum dolor iusto et mazim tempor rebum consequat rebum tempor. Nulla lorem amet liber erat erat labore kasd ipsum magna takimata eum lorem in. Diam blandit rebum dolores amet sit. Doming imperdiet vero mazim at ipsum luptatum sit dolor feugiat eu dolor. Stet diam sadipscing erat magna no ipsum stet. Sea ipsum et erat. Magna sit aliquam rebum accumsan consetetur dolor. Invidunt nonummy erat lorem dignissim amet in et voluptua kasd ipsum. Amet stet tation ut invidunt erat.</p><p>Veniam possim et et amet ut et amet consetetur dolores eos. Adipiscing lobortis diam aliquyam sit imperdiet et nulla dolor dolor. Elitr magna duo amet gubergren nisl dolor sed eirmod imperdiet iriure clita ea feugait eirmod nulla. Eum facer et diam tempor eu lorem magna eos magna ut lobortis et sea erat et. Aliquyam sadipscing nostrud ullamcorper lorem ea dolor hendrerit ut amet invidunt in id accusam. Eirmod invidunt ea sit vero eirmod lorem accusam ipsum. Consetetur nonumy duo aliquyam nonumy hendrerit luptatum. Takimata aliquyam vel amet facilisis diam voluptua sit tempor ipsum consequat clita lobortis dolor eum nonumy ut stet sadipscing.</p>",
    imageUrls: [
      "/images/property-silver-rain.jpg",
      "/images/property-angga-1.png",
      "/images/property-angga-2.png",
    ],
    features: [],
    activities: [],
  });
  const cashville = new Property({
    title: "Cashville",
    price: new mongoose.Types.Decimal128("20"),
    city: "Kemang",
    country: "Indonesia",
    category: hotels._id,
    isPopular: true,
    unit: "day",
    description:
      "<p>Magna takimata placerat accumsan takimata dolor elitr. Sit sit euismod diam duis vulputate gubergren tempor sadipscing dolor nulla at. Amet dolor tempor feugait elitr. Nulla sed ex voluptua. Hendrerit est liber accusam ipsum et et eum et diam molestie. Sea vero sit gubergren labore ipsum vero facer ea dolore sit qui tation ex amet zzril dolor. Iriure ut accusam aliquyam lorem elitr magna aliquyam et accusam erat. Elitr magna rebum nulla erat dolor sit ut nonummy eros voluptua est voluptua ipsum nisl invidunt feugiat et. Sed rebum est et diam labore sed at tempor erat at justo iusto et nonumy consetetur accusam sanctus diam. Eu blandit kasd et ut in amet lorem. Velit amet nulla lorem ipsum sanctus magna suscipit. Sea eum sit kasd no. Dolores sanctus diam et. In diam congue. At sea laoreet ipsum velit no duis. At minim lorem labore accusam et eos dolor sea eirmod takimata consequat lorem et est quod lorem ipsum aliquyam. Amet dolores ipsum sadipscing ea eirmod accusam no velit clita ea blandit no dolore diam lorem kasd.</p><p>Invidunt rebum in erat. Velit dolor hendrerit est lorem. Ipsum takimata ut. Dolores takimata feugait takimata dolor dolore autem consequat sanctus. Eos takimata aliquyam aliquam nihil sanctus consequat magna amet consetetur. Dolore nonumy lorem diam no volutpat dolore.</p>",
    imageUrls: [
      "/images/property-cashville.jpg",
      "/images/property-angga-1.png",
      "/images/property-angga-3.png",
    ],
    features: [
      {
        name: "bedroom",
        quantity: 2,
        iconUrl: "/images/feature-bedroom.png",
      },
      {
        name: "dining room",
        quantity: 1,
        iconUrl: "/images/feature-dining-room.png",
      },
      {
        name: "unit ready",
        quantity: 4,
        iconUrl: "/images/feature-ac.png",
      },
      {
        name: "bathroom",
        quantity: 2,
        iconUrl: "/images/feature-bathroom.png",
      },
      {
        name: "mb/s",
        quantity: 5,
        iconUrl: "/images/feature-wifi.png",
      },
    ],
    activities: [
      {
        name: "Water Polo",
        type: "Pool",
        imageUrl: "/images/activity-water-polo.jpg",
      },
      {
        name: "Green Lake",
        type: "Nature",
        imageUrl: "/images/activity-nature.png",
      },
    ],
  });

  //* Apartment category
  const psWood = new Property({
    title: "PS Wood",
    price: new mongoose.Types.Decimal128("15.99"),
    city: "Depok",
    country: "Indonesia",
    category: apartments._id,
    description:
      "<p>Praesent eum takimata diam eum sed sit amet sit augue sanctus eos stet ipsum eros amet congue. Nulla aliquip odio. Dolores ipsum aliquip nonumy erat diam gubergren augue diam sed sit ut sea no accusam dolore. Labore ea et sadipscing kasd eum est.</p><p>Eum magna sit diam takimata accusam dolore sit elit kasd diam takimata duis justo dolores nonumy takimata amet. Aliquyam sed commodo gubergren minim ut at consectetuer sanctus stet magna lorem dolor eu et dolore sed gubergren lorem. Aliquyam diam kasd nihil eu sanctus. Ut eum magna ipsum lorem. Duo amet eos aliquyam et et sanctus dolore vel est et sanctus sanctus. Consetetur lorem tempor sanctus. Takimata et sed. Erat lorem ex at diam eos lorem at nostrud qui sed sit. Dolor dolor no tempor consetetur et sit lobortis. Facilisi laoreet at dolore. No sea eos feugiat ea no at consetetur voluptua. Magna eum no magna aliquyam placerat est sit. Placerat sanctus invidunt nihil elitr clita tation amet labore labore magna sed amet dolor aliquyam sit sit consequat lorem. Aliquam amet lorem voluptua est in dolores stet lorem vero est et.</p>",
    imageUrls: [
      "/images/property-ps-wood.jpg",
      "/images/property-angga-3.png",
      "/images/property-angga-2.png",
    ],
    features: [],
    activities: [],
  });
  const oneFive = new Property({
    title: "One Five",
    price: new mongoose.Types.Decimal128("77.5"),
    city: "Jakarta",
    country: "Indonesia",
    category: apartments._id,
    description:
      "<p>Et sanctus iriure odio et commodo justo sea option in tincidunt nonumy erat dolores ipsum consetetur at vero congue. Feugiat dolore elit est. Feugait aliquyam iriure quis tempor ea. Amet erat sanctus eum ipsum sit exerci nonumy dolore et sanctus. Ut sanctus illum et amet consetetur dolore. Elitr in invidunt eum consetetur vulputate consetetur kasd voluptua et sit. Sed aliquyam lobortis duo kasd vulputate amet clita dolore accumsan. Duis qui labore dolore et dolor ad duis et euismod sadipscing suscipit hendrerit sanctus consetetur dolore diam. Dolor soluta kasd lorem veniam et labore labore stet tincidunt diam amet praesent takimata. Dolore suscipit clita quis et vero ipsum hendrerit sit qui eirmod volutpat nulla ea stet.</p><p>Duo sed invidunt sanctus sit dolores sea rebum labore consequat labore nonumy duo dolores. Esse tempor stet ea. Voluptua vero diam option voluptua duis facilisis eos accusam augue justo wisi ullamcorper nonumy dolore nonumy ut. Nonumy sea lorem doming et eirmod eu dolor sed nisl aliquyam et in dolor ipsum justo minim facilisis. Ut rebum invidunt liber ex dolore aliquip nobis eleifend ut facilisis labore justo erat sed dolores takimata. Lorem tempor sanctus et vero in amet consetetur aliquyam vero sit vel consequat dolore odio invidunt sit eu. Ipsum justo labore labore. Et ea congue blandit consetetur tempor amet labore sed. Ipsum elitr sit dolor accusam sit. Sadipscing vero adipiscing ut aliquyam ea duo eos et erat elitr vero diam dolor. Lorem aliquam et velit sed tation amet ipsum takimata dolores sadipscing diam illum aliquyam nonumy. Kasd sit facilisis voluptua dolore sit lorem tempor ipsum adipiscing stet sea takimata takimata. Laoreet ea et nonumy duis et eleifend est wisi consetetur accusam velit dolores invidunt nonumy liber sit amet volutpat. Diam kasd aliquam. Molestie ea minim est erat eos eos quis lorem takimata. Vel commodo at kasd quis gubergren sed sea ea euismod stet ipsum sit. Voluptua justo dolore diam voluptua et tation quis ipsum iusto dolore nonumy aliquyam. Nonumy accusam euismod nonumy sed enim no takimata facilisis. Takimata accusam ut lorem ex sed dolore imperdiet lorem.</p>",
    imageUrls: [
      "/images/property-one-five.jpg",
      "/images/property-angga-2.png",
      "/images/property-angga-3.png",
    ],
    features: [],
    activities: [],
  });
  const minimal = new Property({
    title: "Minimal",
    price: new mongoose.Types.Decimal128("32.25"),
    city: "Bogor",
    country: "Indonesia",
    category: apartments._id,
    description:
      "<p>Elitr nihil et aliquyam. Tempor et rebum in. Nostrud eros aliquyam duo dolor vel aliquyam est. Magna aliquyam erat diam no iriure ut amet feugait minim kasd sed kasd. Sea sit in eos accusam. Velit nonumy nostrud lorem est eos stet. Ea gubergren augue sadipscing amet et amet elit dolor elitr rebum molestie veniam. Dolore ut facilisis et praesent eos et ea clita vel no ut rebum. Et nonummy sit iriure aliquyam sanctus enim dolore dolor dolores duis sed nulla sit sea duo gubergren. Sed amet takimata elitr gubergren eos zzril hendrerit sanctus duo dolor et labore dolore sanctus. Ullamcorper invidunt sed invidunt hendrerit vero diam gubergren ea vero diam at et voluptua diam ad lorem at consetetur. Ut sed dolores duis magna. Lorem magna vulputate ut et magna invidunt lorem. Facilisi diam facilisi tation sit duo suscipit. Et invidunt est invidunt magna consetetur ea dolor gubergren nonumy. Dolores eum duo sed sanctus et at nonummy aliquyam et dolor eos nonumy eum justo amet. Sit lorem voluptua sit doming sit sit tation takimata duo duo tempor ut iusto. Sadipscing vel nonumy diam eirmod.</p><p>Ut voluptua suscipit consetetur amet aliquam stet ea aliquyam vero sed amet nobis. Clita ut diam rebum. Duo dolor dolore. Id consetetur nulla et aliquyam. Tempor eos te ex vel in aliquam et luptatum dolor dolor autem eum. No eros nisl est clita magna et enim doming accusam. Justo consetetur aliquam gubergren lorem laoreet. Dolore kasd consetetur nonumy labore nonummy.</p>",
    imageUrls: [
      "/images/property-minimal.jpg",
      "/images/property-angga-1.png",
      "/images/property-angga-3.png",
    ],
    features: [
      {
        name: "refrigerator",
        quantity: 6,
        iconUrl: "/images/feature-refrigerator.png",
      },
      {
        name: "televison",
        quantity: 12,
        iconUrl: "/images/feature-television.png",
      },
      {
        name: "bedroom",
        quantity: 2,
        iconUrl: "/images/feature-bedroom.png",
      },
      {
        name: "unit ready",
        quantity: 4,
        iconUrl: "/images/feature-ac.png",
      },
      {
        name: "mb/s",
        quantity: 5,
        iconUrl: "/images/feature-wifi.png",
      },
      {
        name: "bathroom",
        quantity: 2,
        iconUrl: "/images/feature-bathroom.png",
      },
    ],
    activities: [
      {
        name: "Green Lake",
        type: "Nature",
        imageUrl: "/images/activity-nature.png",
      },
      {
        name: "Snorkeling",
        type: "Beach",
        imageUrl: "/images/activity-beach.png",
      },
      {
        name: "Labour and Wait",
        type: "Shopping",
        imageUrl: "/images/activity-shopping.png",
      },
      {
        name: "Water Polo",
        type: "Pool",
        imageUrl: "/images/activity-water-polo.jpg",
      },
    ],
  });
  const staysHome = new Property({
    title: "Stays Home",
    price: new mongoose.Types.Decimal128("100.5"),
    city: "Wonosobo",
    country: "Indonesia",
    category: apartments._id,
    description:
      "<p>Exerci duo ut clita dolor nonumy iusto sit et duo quis ipsum. Amet ipsum tempor molestie. Est et dolor sit voluptua. Consetetur dolore et dolore sed. Takimata eos lorem iriure tempor justo consetetur et dolores id consectetuer ipsum ipsum elitr sea vero no. Sea takimata placerat consetetur diam ut elitr exerci erat nisl duo sadipscing. Facer sit dolore kasd amet lorem. Magna molestie dolor possim lobortis et lobortis lorem dolor rebum diam tempor. Sit eos accusam facilisi stet dolore rebum sit eros. Ullamcorper lorem sea molestie sit magna sit. Ut dolor sadipscing invidunt nulla augue. Sanctus sed lorem tation facilisis duis sed magna nisl et ad aliquyam at dolore dignissim takimata labore aliquip nulla. Invidunt delenit mazim no justo dolor illum et labore sed ea et diam liber at. Autem vulputate sit elitr sed duo stet ea consequat amet vero duo. Eum gubergren lorem sit. Augue in invidunt diam iriure praesent dolore diam feugiat eu sanctus aliquip et takimata. Gubergren elitr tempor suscipit. Erat est clita vero kasd dolor vero.</p><p>Et sit dolor. Tempor sea et velit nulla kasd ipsum laoreet eirmod tempor elitr no sit sed et veniam. Et labore vulputate ea kasd takimata aliquyam sed sed. Eum justo et no vero accusam dolore invidunt. Eos magna elit kasd consetetur at in justo dignissim erat ea eos elitr magna. Amet duo gubergren aliquyam in dolor esse no enim te est tempor lorem nostrud. Ipsum nibh dolore nobis nonumy tempor aliquam eos wisi consetetur volutpat eirmod vero no dolor dolore. Dolor aliquyam no at elit est hendrerit eos ut iusto justo justo aliquyam nisl invidunt at. Feugiat accusam magna dolore dolore ex amet eum rebum ut eos stet clita. Duo euismod dolor illum vero cum sea sed ut ut lorem invidunt ea lobortis iusto diam. Amet vel diam erat elitr volutpat doming ut commodo. Aliquyam sit duis justo ut dolor exerci dolor. Vel eos clita accusam stet exerci sit. Est erat ut sed sea ipsum labore vero zzril est et voluptua no. Erat consetetur accusam erat nonumy exerci et ut rebum et ut dolor te option esse tation et. Erat ut diam gubergren rebum sanctus accusam ea luptatum. Lorem consectetuer eirmod at eu iriure sadipscing consequat lorem. Erat takimata aliquyam stet ea gubergren takimata amet quis nisl. Nonumy commodo ea aliquyam illum ipsum lorem erat et exerci at sea.</p>",
    imageUrls: [
      "/images/property-stays-home.jpg",
      "/images/property-angga-3.png",
      "/images/property-angga-1.png",
    ],
    features: [],
    activities: [],
  });

  //* Most picked
  const blueOrigin = new Property({
    title: "Blue Origin Fams",
    price: new mongoose.Types.Decimal128("149.99"),
    city: "Jakarta",
    country: "Indonesia",
    category: houses._id,
    description:
      "<p>At tempor nonummy ea duo ullamcorper tempor. Et accusam et sed ipsum dolor diam. Id aliquam dolore kasd ea eirmod eirmod amet ipsum hendrerit tincidunt aliquyam labore. Feugait autem voluptua nam eirmod facilisi aliquyam aliquyam elitr sit eirmod sit vulputate erat no sanctus amet elitr. Dolore stet tempor. Sadipscing dolores euismod eos dolore dolores vel dolore magna elitr. Amet sea sit magna facilisi feugiat velit ipsum. Ut clita et illum diam tempor sadipscing accusam feugiat dolor dolor dolore nam lorem praesent. Adipiscing takimata volutpat aliquyam iriure ea ut lorem stet et amet lorem duo lorem sit magna. Sanctus consetetur magna ipsum consetetur lorem amet vero at. Nisl sed elit nonumy est ut elitr diam in duo ut erat tempor. Dolore justo id stet eirmod accusam sea sit et volutpat zzril dolor est.</p><p>Lobortis vero est eos quis ipsum duis eleifend amet eum dignissim diam. Sanctus dolor lorem takimata vero ipsum delenit nulla erat eos consequat justo no dolor. Rebum vero amet rebum et nam ut nibh aliquyam sit mazim aliquyam accusam justo amet euismod ut dolor et. Dolor justo diam aliquip dolor kasd iriure sed duo dolor cum liber delenit placerat.</p>",
    imageUrls: [
      "/images/property-blue-origin.jpg",
      "/images/property-angga-2.png",
      "/images/property-angga-1.png",
    ],
    features: [
      {
        name: "mb/s",
        quantity: 5,
        iconUrl: "/images/feature-wifi.png",
      },
      {
        name: "unit ready",
        quantity: 4,
        iconUrl: "/images/feature-ac.png",
      },
      {
        name: "televison",
        quantity: 12,
        iconUrl: "/images/feature-television.png",
      },
      {
        name: "refrigerator",
        quantity: 6,
        iconUrl: "/images/feature-refrigerator.png",
      },
      {
        name: "living room",
        quantity: 23,
        iconUrl: "/images/feature-living-room.png",
      },
      {
        name: "dining room",
        quantity: 1,
        iconUrl: "/images/feature-dining-room.png",
      },
      {
        name: "bathroom",
        quantity: 2,
        iconUrl: "/images/feature-bathroom.png",
      },
      {
        name: "bedroom",
        quantity: 2,
        iconUrl: "/images/feature-bedroom.png",
      },
    ],
    activities: [
      {
        name: "Labour and Wait",
        type: "Shopping",
        imageUrl: "/images/activity-shopping.png",
      },
      {
        name: "Snorkeling",
        type: "Beach",
        imageUrl: "/images/activity-beach.png",
      },
      {
        name: "Water Polo",
        type: "Pool",
        imageUrl: "/images/activity-water-polo.jpg",
      },
      {
        name: "Green Lake",
        type: "Nature",
        imageUrl: "/images/activity-nature.png",
      },
    ],
  });
  const oceanLand = new Property({
    title: "Ocean Land",
    price: new mongoose.Types.Decimal128("130"),
    city: "Bandung",
    country: "Indonesia",
    category: apartments._id,
    description:
      "<p>Lorem et esse eos invidunt facilisis et amet qui aliquyam accusam autem. Consequat stet lorem vero sea invidunt est justo vulputate option labore est dolor. Kasd et dolor ut vero diam elitr et amet ipsum.</p><p>Sit at takimata voluptua odio ex dolor esse accumsan diam sed consequat possim ad invidunt. Ipsum diam lorem duo sadipscing sanctus eos augue ea consetetur. Sadipscing diam et blandit magna sea sit ut commodo stet. Diam lorem et nulla et. Elitr iusto magna et et ut. Justo ipsum ipsum stet facilisis aliquip tempor elitr sed takimata ipsum commodo ipsum vulputate magna in ipsum feugiat liber. Et lorem accumsan ex duis eos lorem diam. Stet sit diam illum consetetur rebum eirmod gubergren esse vero sit tempor vulputate blandit sea dolore sed congue ea. Et minim dolor dolore takimata quis dignissim elitr rebum dolor sanctus. Tempor sed rebum diam sea dolores sed sed ut illum ea lorem feugait et. Ea dolores sit accusam hendrerit nonumy sed. Et lorem et at. Consetetur diam quis nostrud duo ad enim clita lorem sit feugiat. Justo takimata consetetur. Consequat ipsum vero diam invidunt diam at stet. Rebum no gubergren magna consetetur gubergren dolor te kasd vel nibh dolores. Invidunt elitr dolores lorem sit et eos no lorem consequat et. Et eleifend nobis sit duis eirmod et commodo labore eirmod elitr lobortis ipsum no sed. Et minim feugait vulputate duo eos kasd dolore dolor nam sadipscing no nonumy praesent feugiat feugait.</p>",
    imageUrls: [
      "/images/property-ocean-land.jpg",
      "/images/property-angga-2.png",
      "/images/property-angga-3.png",
    ],
    features: [],
    activities: [],
  });
  const starkHouse = new Property({
    title: "Stark House",
    price: new mongoose.Types.Decimal128("124.25"),
    city: "Malang",
    country: "Indonesia",
    category: hotels._id,
    description:
      "<p>Et no adipiscing diam labore sea kasd amet in dolore qui no dolores ipsum at diam tation elitr sed. Diam ipsum dolor justo sadipscing sanctus amet accusam minim molestie no eu. Erat eirmod et quis consetetur nonumy commodo voluptua blandit ut. Adipiscing diam nonumy in qui facilisis gubergren consequat ea euismod tation eos est lorem et sed rebum. Nisl takimata vero invidunt sit nonumy et sadipscing accusam rebum adipiscing sea nonumy suscipit wisi te eirmod erat. Lorem odio tempor vero takimata aliquyam ipsum vulputate ea. Amet gubergren dolores molestie. Dolor duis est id. Sit eros facilisis voluptua sit est erat invidunt dolor nibh augue gubergren. Dolore gubergren labore dignissim consequat dolores takimata sadipscing dignissim. Lorem no tempor ea. Molestie duis et est stet no. Clita rebum rebum feugiat dolor vel congue velit facilisi eirmod ut esse tincidunt in possim. Amet accusam assum sed feugiat at sed sit no suscipit sea. Takimata ullamcorper sea dolor nostrud. Et accusam accusam eos luptatum est consetetur labore clita ea at amet diam sed. Dolores vero ut at. Lorem molestie dolor vulputate.</p><p>Sit et erat sit elitr tempor gubergren dolore sit justo dolore nisl. Gubergren et feugiat illum sit labore no dolore. Consetetur at eos eos eos eum velit sed justo dolor tempor justo no. Sanctus sanctus vero tempor nonumy tincidunt luptatum vel kasd dolor dolor nibh elit sanctus takimata nonumy et gubergren. Rebum magna odio dolor justo zzril dolor eum. Amet sanctus ut dolores takimata rebum euismod justo et sit justo. Veniam duo aliquyam vel te veniam ipsum dolore nisl erat ipsum autem facilisis consetetur justo duo nostrud est. Exerci ut labore consetetur est luptatum magna et dignissim amet tempor invidunt. At molestie ea magna sed sanctus sadipscing invidunt amet tation gubergren tempor justo sea esse clita vero takimata tincidunt. Facilisis voluptua sanctus illum at at magna quis. Autem sit wisi diam eirmod lorem sed te sed nonummy lobortis. Et amet mazim takimata sanctus ut diam tempor sed kasd sadipscing sed. Clita ea vel tempor takimata dolores at.</p>",
    imageUrls: [
      "/images/property-stark-house.jpg",
      "/images/property-angga-3.png",
      "/images/property-angga-2.png",
    ],
    features: [],
    activities: [],
  });
  const vinnaVilla = new Property({
    title: "Vinna Villa",
    price: new mongoose.Types.Decimal128("120.50"),
    city: "Malang",
    country: "Indonesia",
    category: houses._id,
    description:
      "<p>Est consetetur voluptua consetetur dolore et eum commodo dolore autem. Invidunt sed magna eirmod at erat nonumy aliquam accusam ea elit sea at takimata sit nonumy. Eos ut quis sed dolores gubergren vulputate eos dolor dolore lorem eos elit at sed facilisis. Erat elitr et consequat augue ullamcorper sed stet tempor takimata sanctus ipsum ut diam aliquyam aliquyam ipsum dolor. Eirmod nostrud ipsum. Gubergren sit diam eirmod ut ea sed feugiat accusam. Lorem nam no nonumy iriure gubergren dolor dolore elitr nostrud. Sit erat amet sadipscing suscipit.</p><p>Rebum magna dolor. Et sadipscing hendrerit vel consequat justo sadipscing accusam velit consequat ea tincidunt. Feugiat est eros sanctus qui blandit velit lorem sadipscing feugiat. Sanctus commodo consetetur amet ut dolor. Nonumy sanctus diam dolor illum feugiat eos sea sed accusam accusam vero eos amet ipsum iriure sit tempor ex. Consetetur erat praesent et et dolore et ut et tincidunt minim consectetuer esse consequat erat justo. Ut ut erat eum clita vulputate duo. Et voluptua quod. Accusam volutpat sea sea dolor et eros eos est ea eos stet vulputate aliquyam et suscipit eirmod ipsum. Accusam est takimata eirmod. Accusam at enim laoreet et nonumy dolores. Takimata et dolore sea lobortis vulputate sadipscing no dolor dolor et nonumy eu amet dolor sanctus. No sit velit velit aliquam aliquyam ea erat sed est dolore magna amet sanctus praesent et. Laoreet et sea ea sit. No iriure justo at vero lorem ut accusam at voluptua exerci exerci sadipscing lorem dolore odio gubergren. Vel dolore ipsum clita in dolor sed amet takimata gubergren diam tempor duis.</p>",
    imageUrls: [
      "/images/property-vinna-villa.jpg",
      "/images/property-angga-1.png",
      "/images/property-angga-3.png",
    ],
    features: [],
    activities: [],
  });
  const bobox = new Property({
    title: "Bobox",
    price: new mongoose.Types.Decimal128("114.50"),
    city: "Medan",
    country: "Indonesia",
    category: hotels._id,
    description:
      "<p>Sit sed sed cum vulputate elitr. Elitr labore takimata feugait gubergren zzril accumsan ut lorem sit diam et dolores molestie erat dolor. Sit labore takimata elitr sea. Nonumy diam molestie delenit dolor et elitr duo lorem tincidunt sit sed justo est labore gubergren. Nibh et facilisi at luptatum at justo takimata dolores delenit eos diam takimata. Est dolores takimata duo ad magna dolores nostrud sit clita labore dolor ut ut aliquyam gubergren elitr et sed. Amet lorem commodo dolor dolor ipsum.</p><p>Erat sea duo delenit nulla in dolor eos clita tempor. Consequat nibh stet id sed sed enim nonumy soluta gubergren sed in diam. Dolore duo labore amet nonumy duis veniam et sadipscing sed nonumy. Et est facilisis nonumy sanctus lorem et dolores est kasd invidunt te et gubergren voluptua stet. Vel et vel sed tempor dolore erat minim invidunt eos ullamcorper odio et labore et aliquyam. Accusam no kasd enim lorem sea justo facilisi elitr dolor amet at sed consequat.</p>",
    imageUrls: [
      "/images/property-bobox.jpg",
      "/images/property-angga-3.png",
      "/images/property-angga-1.png",
    ],
    features: [],
    activities: [],
  });
  await Property.insertMany([
    tabbyTown,
    anggana,
    seattleRain,
    woodenPit,
    greenPark,
    podoWae,
    silverRain,
    cashville,
    psWood,
    oneFive,
    minimal,
    staysHome,
    blueOrigin,
    oceanLand,
    starkHouse,
    vinnaVilla,
    bobox,
  ]);

  const bsi = new Bank({
    name: "Bank Syariah Indonesia",
    logoUrl: "/images/bsi-logo.png",
    accountNumbers: "22081544",
    accountHolderName: "Amir Muhammad Hakim",
  });
  const bsm = new Bank({
    name: "Bank Syariah Mandiri",
    logoUrl: "/images/mandiri-syariah-logo.png",
    accountNumbers: "77542493",
    accountHolderName: "Muhammad Avdol",
  });
  await Bank.insertMany([bsi, bsm]);

  const elfinBooking = new Booking({
    startDate: new Date(2022, 0, 20),
    endDate: new Date(2022, 0, 22),
    duration: 3,
    member: {
      firstName: "Elfin",
      lastName: "Sanjaya",
      email: "elfinsanjaya12@gmail.com",
      phone: "082377954008",
    },
    property: {
      current: blueOrigin._id,
      price: blueOrigin.price,
    },
    payment: {
      imageProofUrl: "/images/payment-proof-1.jpeg",
      originBankName: "BTPN Syariah",
      accountHolderName: "Ismail Ahmad Kanabawi",
      status: "Accepted",
    },
  });
  const yeinBooking = new Booking({
    startDate: new Date(2022, 4, 15),
    endDate: new Date(2022, 5, 10),
    duration: 27,
    member: {
      firstName: "Yein",
      lastName: "Narayana",
      email: "yein.narayana@gmail.com",
      phone: "082377954008",
    },
    property: {
      current: blueOrigin._id,
      price: blueOrigin.price,
    },
    payment: {
      imageProofUrl: "/images/payment-proof-2.jpeg",
      originBankName: "Bank Syariah Indonesia",
      accountHolderName: "Khalid Kashmiri",
      status: "Accepted",
    },
  });
  const amirBooking = new Booking({
    startDate: new Date(2022, 9, 12),
    endDate: new Date(2022, 9, 15),
    duration: 4,
    member: {
      firstName: "Amir",
      lastName: "Hakim",
      email: "mramirid@gmail.com",
      phone: "087554466633",
    },
    property: {
      current: oceanLand._id,
      price: oceanLand.price,
    },
    payment: {
      imageProofUrl: "/images/payment-proof-1.jpeg",
      originBankName: "Bank Syariah Indonesia",
      accountHolderName: "Amir Muhammad Hakim",
      status: "Accepted",
    },
  });
  const usmanBooking = new Booking({
    startDate: new Date(2022, 9, 17),
    endDate: new Date(2022, 9, 26),
    duration: 10,
    member: {
      firstName: "Utsman",
      lastName: "Abdul",
      email: "utsman@gmail.com",
      phone: "085777333721",
    },
    property: {
      current: starkHouse._id,
      price: starkHouse.price,
    },
    payment: {
      imageProofUrl: "/images/payment-proof-2.jpeg",
      originBankName: "Bank Mandiri Syariah",
      accountHolderName: "Utsman Abdul Jalil Shisha",
      status: "Accepted",
    },
  });
  const yaqubBooking = new Booking({
    startDate: new Date(2022, 9, 27),
    endDate: new Date(2022, 10, 10),
    duration: 15,
    member: {
      firstName: "Yaqub",
      lastName: "Qomarudin Dibiazah",
      email: "qomarudin.dibiazah@gmail.com",
      phone: "083443344555",
    },
    property: {
      current: vinnaVilla._id,
      price: vinnaVilla.price,
    },
    payment: {
      imageProofUrl: "/images/payment-proof-1.jpeg",
      originBankName: "BNI Syariah",
      accountHolderName: "Yaqub Qomarudin Dibizah",
      status: "Accepted",
    },
  });
  const khidirBooking = new Booking({
    startDate: new Date(2022, 10, 23),
    endDate: new Date(2022, 10, 23),
    duration: 1,
    member: {
      firstName: "Khidir",
      lastName: "Karawitah",
      email: "khidir@gmail.com",
      phone: "081448822555",
    },
    property: {
      current: bobox._id,
      price: bobox.price,
    },
    payment: {
      imageProofUrl: "/images/payment-proof-2.jpeg",
      originBankName: "BCA Syariah",
      accountHolderName: "Khidir Karawitah",
      status: "Accepted",
    },
  });
  await Booking.insertMany([
    elfinBooking,
    yeinBooking,
    amirBooking,
    usmanBooking,
    yaqubBooking,
    khidirBooking,
  ]);

  const mramirid = await User.create({
    username: "mramirid",
    password: "jajaja",
  });

  return {
    categories: { houses, hotels, apartments },
    properties: {
      tabbyTown,
      anggana,
      seattleRain,
      woodenPit,
      greenPark,
      podoWae,
      silverRain,
      cashville,
      psWood,
      oneFive,
      minimal,
      staysHome,
      blueOrigin,
      oceanLand,
      starkHouse,
      vinnaVilla,
      bobox,
    },
    banks: { bsi, bsm },
    bookings: {
      elfinBooking,
      yeinBooking,
      amirBooking,
      usmanBooking,
      yaqubBooking,
      khidirBooking,
    },
    users: { mramirid },
  };
}

type SeedResult = {
  categories: {
    [name: string]: CategoryDoc;
  };
  properties: {
    [title: string]: PropertyDoc;
  };
  banks: {
    [name: string]: BankDoc;
  };
  bookings: {
    [memberName: string]: BookingDoc;
  };
  users: {
    [username: string]: UserDoc;
  };
};
