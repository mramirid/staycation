import { isUndefined } from "lodash-es";

export function formatToUSD(amount: number) {
  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formattedAmount;
}

export function formatCountSuffix(count: number, suffix?: Suffix) {
  if (isUndefined(suffix)) {
    return count.toString();
  }
  return pluralize(count, suffix.singular, suffix.plural ?? suffix.singular);
}

export type Suffix = {
  singular: string;
  plural?: string;
};

const pluralRules = new Intl.PluralRules("en-US");

function pluralize(count: number, singular: string, plural: string) {
  const grammaticalNumber = pluralRules.select(count);
  switch (grammaticalNumber) {
    case "one":
      return `${count} ${singular}`;
    case "other":
      return `${count} ${plural}`;
    default:
      throw new Error("Unknown: " + grammaticalNumber);
  }
}
