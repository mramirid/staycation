import { model, Schema } from "mongoose";

export interface IBank {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

const bankSchema = new Schema<IBank>({
  bankName: {
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
