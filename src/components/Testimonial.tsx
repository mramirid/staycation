import { clx } from "@/lib/styling";
import type { Testimonial as TestimonialType } from "@/types";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

type Props = {
  className: string;
  testimonial: TestimonialType;
};

export default function Testimonial(props: Props) {
  return (
    <section className={clx("flex", props.className)}>
      <TestimonialPortrait imageUrl={props.testimonial.imageUrl} />
      <TestimonialContent className="ml-14" testimonial={props.testimonial} />
    </section>
  );
}

function TestimonialContent({ testimonial, className }: Props) {
  const gotoTestimonialStory = () => {
    // TODO: I don't know
  };

  return (
    <div className={clx("self-center", className)}>
      <h4 className="mb-10 font-medium text-2xl">{testimonial.name}</h4>
      <StarRating
        rating={testimonial.rate}
        starDimension="36px"
        starSpacing="4px"
      />
      <h2 className="font-normal text-[2rem] my-2">{testimonial.content}</h2>
      <span className="font-light text-lg block">
        {testimonial.familyOccupation}
      </span>
      <Link
        to="#"
        className="app-btn app-btn-primary mt-[3.125rem]"
        onClick={gotoTestimonialStory}
      >
        Read Their Story
      </Link>
    </div>
  );
}

type HeroBannerProps = {
  imageUrl: string;
};

function TestimonialPortrait({ imageUrl }: HeroBannerProps) {
  return (
    <div>
      <div className="relative h-[34rem] w-[25.3rem]">
        <div className="absolute top-0 bottom-10 w-[23rem] border-2 rounded-2xl" />
        <div
          className={clx(
            "absolute bg-cover bg-no-repeat w-[23rem] h-[31.25rem] bottom-0",
            "left-10 top-10 rounded-2xl rounded-br-[100px]"
          )}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
    </div>
  );
}
