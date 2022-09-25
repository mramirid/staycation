import { HydratedDocument, Model, model, Schema } from "mongoose";

interface IMember {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface IMemberVirtuals {
  fullName: string;
}

export type MemberDoc = HydratedDocument<
  IMember,
  Record<string, never>,
  IMemberVirtuals
>;

type MemberModel = Model<
  IMember,
  Record<string, never>,
  Record<string, never>,
  IMemberVirtuals
>;

const memberSchema = new Schema<
  IMember,
  MemberModel,
  Record<string, never>,
  Record<string, never>,
  IMemberVirtuals
>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

memberSchema
  .virtual("fullName")
  .get(function (this: HydratedDocument<IMember>) {
    return `${this.firstName} ${this.lastName}`;
  });

const Member = model("Member", memberSchema);
export default Member;
