import { model, Schema } from "mongoose";

interface IMember {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const memberSchema = new Schema<IMember>({
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

const Member = model("Member", memberSchema);
export default Member;
