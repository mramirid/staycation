import { model, Schema, Types } from "mongoose";
import Fruit from "./Fruit";

interface IPerson {
  _id: Types.ObjectId;
  name: string;
  age: number;
  fruit: Types.ObjectId;
}

const personSchema = new Schema<IPerson>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  fruit: {
    type: Schema.Types.ObjectId,
    ref: Fruit,
    required: true,
  },
});

const Person = model("Person", personSchema);
export default Person;
