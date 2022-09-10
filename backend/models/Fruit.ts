import { model, Schema } from "mongoose";

interface IFruit {
  name: string;
  rating: number;
  review: string;
}

const fruitSchema = new Schema<IFruit>({
  name: String,
  rating: Number,
  review: String,
});

const Fruit = model("Fruit", fruitSchema);
export default Fruit;
