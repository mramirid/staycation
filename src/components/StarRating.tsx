import type { ComponentProps } from "react";
import StarRatings from "react-star-ratings";

export default function StarRating(props: ComponentProps<typeof StarRatings>) {
  return (
    <StarRatings
      {...props}
      starRatedColor="#FFCC47" //* warning
      starEmptyColor="#B0B0B0" //* base-300
    />
  );
}
