import _ from "lodash";
import { HydratedDocument, model, Query, Schema } from "mongoose";
import { IProperty } from "./Property";

export interface ICategory {
  name: string;
}

export type CategoryDoc = HydratedDocument<ICategory>;

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
});

categorySchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (this: Query<unknown, unknown>) {
    const { _id } = this.getQuery();

    const property = await model<IProperty>("Property").findOne({
      category: _id,
    });

    if (_.isObject(property)) {
      throw new Error("The category is being used by some properties");
    }
  }
);

const Category = model("Category", categorySchema);
export default Category;
