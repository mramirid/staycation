import { model, Schema } from "mongoose";

export interface IFruit {
  name: string;
  rating: number;
  review?: string;
}

const fruitSchema = new Schema<IFruit>({
  name: {
    type: String,
    required: [true, "Please specify the fruit name"],
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  review: String,
});

const Fruit = model("Fruit", fruitSchema);
export default Fruit;
