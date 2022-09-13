import { model, Schema } from "mongoose";

export interface IBank {
  name: string;
  logoUrl: string;
  accountNumber: string;
  accountHolderName: string;
}

const bankSchema = new Schema<IBank>({
  name: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
});

const Bank = model("Bank", bankSchema);
export default Bank;
