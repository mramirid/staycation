import { HydratedDocument, model, Schema } from "mongoose";

interface IBank {
  name: string;
  logoUrl: string;
  accountNumber: string;
  accountHolderName: string;
}

export type BankDoc = HydratedDocument<IBank>;

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
