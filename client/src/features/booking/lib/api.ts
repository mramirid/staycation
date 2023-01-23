import {
  ResponseError,
  ResponseValidationError,
  type ValidationErrorData,
} from "@/lib/error";
import { getErrorMessage } from "@/utils/error";
import { StatusCodes } from "http-status-codes";

export async function getBanks(): Promise<Bank[]> {
  const cmsBaseUrl = import.meta.env.VITE_CMS_BASE_URL;

  const response = await fetch(cmsBaseUrl + "/api/v1/client/banks");

  if (!response.ok) {
    const error = await response.json();
    throw new ResponseError(getErrorMessage(error), response.status);
  }

  let banks: Bank[] = await response.json();

  banks = banks.map<Bank>((bank) => ({
    ...bank,
    logoUrl: cmsBaseUrl + bank.logoUrl,
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

export async function bookProperty(formData: FormData): Promise<void> {
  const response = await fetch(
    import.meta.env.VITE_CMS_BASE_URL + "/api/v1/client/bookings",
    {
      method: "post",
      body: formData,
    }
  );
  if (response.ok) {
    return;
  }

  const data: ValidationErrorData = await response.json();
  if (response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
    const response422Error = new ResponseValidationError(data);
    throw response422Error;
  }
  throw new ResponseError(getErrorMessage(data), response.status);
}
