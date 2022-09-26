import bcrypt from "bcryptjs";
import { HydratedDocument, model, Schema } from "mongoose";

export interface IUser {
  username: string;
  password: string;
}

export type UserDoc = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = model("User", userSchema);
export default User;
