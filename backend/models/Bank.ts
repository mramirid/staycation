import { HydratedDocument, model, Schema } from "mongoose";
import validator from "validator";

interface IBank {
  name: string;
  logoUrl: string;
  accountNumbers: string;
  accountHolderName: string;
}

export type BankDoc = HydratedDocument<IBank>;

const bankSchema = new Schema<IBank>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  accountNumbers: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v: unknown) =>
        validator.isInt(String(v), { allow_leading_zeroes: true, min: 0 }),
      message: "Account numbers must be integers only",
    },
  },
  accountHolderName: {
    type: String,
    required: true,
    trim: true,
  },
});

const Bank = model("Bank", bankSchema);
export default Bank;
