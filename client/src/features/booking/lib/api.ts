import { ResponseError } from "@/lib/error";
import { getErrorMessage } from "@/utils/error";

export async function getBanks(): Promise<Bank[]> {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  const response = await fetch(backendBaseUrl + "/api/v1/client/banks");

  if (!response.ok) {
    const resBody = await response.json();
    const errorMessage = getErrorMessage(resBody.error);
    throw new ResponseError(errorMessage, response.status);
  }

  let banks: Bank[] = await response.json();

  banks = banks.map<Bank>((bank) => ({
    ...bank,
    logoUrl: backendBaseUrl + bank.logoUrl,
  }));

  return banks;
}

export type Bank = {
  _id: string;
  name: string;
  logoUrl: string;
  accountNumbers: string;
  accountHolderName: string;
};
