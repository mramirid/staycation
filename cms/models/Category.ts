import { HydratedDocument, model, Query, Schema } from "mongoose";
import type { IProperty } from "./Property";

export interface ICategory {
  name: string;
}

export type CategoryDoc = HydratedDocument<ICategory>;

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

categorySchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (this: Query<unknown, unknown>) {
    const { _id } = this.getQuery();

    const numProperties = await model<IProperty>("Property").countDocuments({
      category: _id,
    });

    if (numProperties > 0) {
      throw new Error("The category is being used by some properties");
    }
  }
);

const Category = model("Category", categorySchema);
export default Category;
