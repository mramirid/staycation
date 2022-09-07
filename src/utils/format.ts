import { isString, isUndefined } from "lodash-es";

export function formatToUSD(amount: number) {
  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formattedAmount;
}

export type Suffix = {
  singular: string;
  plural?: string;
};

export function formatWithSuffix(value: number, suffix?: Suffix) {
  let text = value.toString();

  if (isUndefined(suffix)) {
    text = "";
  } else if (isString(suffix.plural) && value > 1) {
    text += ` ${suffix.plural}`;
  } else {
    text += ` ${suffix.singular}`;
  }

  return text;
}
