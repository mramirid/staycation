import { clx } from "@/utils/styling";
import type { ComponentProps } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

type TestimonialProps = {
  className: string;
  testimonial: TestimonialType;
};

export type TestimonialType = {
  _id: string;
  imageUrl: string;
  title: string;
  rate: number;
  content: string;
  member: {
    name: string;
    occupation: string;
  };
};

export default function Testimonial(props: TestimonialProps) {
  return (
    <Fade direction="up" triggerOnce className={props.className}>
      <section className="flex flex-col gap-14 lg:flex-row">
        <TestimonialPortrait imageUrl={props.testimonial.imageUrl} />
        <TestimonialContent testimonial={props.testimonial} />
      </section>
    </Fade>
  );
}

type TestimonialContentProps = {
  testimonial: TestimonialType;
};

function TestimonialContent({ testimonial }: TestimonialContentProps) {
  const gotoTestimonialStory = () => {
    // TODO: I don't know
  };

  return (
    <div className="self-center">
      <h4 className="mb-10 font-medium text-2xl">{testimonial.title}</h4>
      <StarRating
        rating={testimonial.rate}
        starDimension="36px"
        starSpacing="4px"
      />
      <h2 className="font-normal text-[2rem] my-2">{testimonial.content}</h2>
      <span className="font-light text-lg block">
        {testimonial.member.name}, {testimonial.member.occupation}
      </span>
      <Link
        to="#"
        className="app-btn app-btn-primary mt-50px"
        onClick={gotoTestimonialStory}
      >
        Read Their Story
      </Link>
    </div>
  );
}

function StarRating(props: ComponentProps<typeof StarRatings>) {
  return (
    <StarRatings
      {...props}
      starRatedColor="#FFCC47" //* warning
      starEmptyColor="#B0B0B0" //* base-300
    />
  );
}

type HeroBannerProps = {
  imageUrl: string;
};

function TestimonialPortrait(props: HeroBannerProps) {
  const imageUrl = import.meta.env.VITE_CMS_BASE_URL + props.imageUrl;

  return (
    <div>
      <div className="relative aspect-[0.75] max-w-[25.3rem] self-center lg:w-[25.3rem]">
        <div className="absolute top-0 bottom-10 left-0 right-10 border-2 rounded-2xl" />
        <div
          className={clx(
            "absolute bg-cover bg-no-repeat right-0 bottom-0 left-10 top-10",
            "rounded-2xl rounded-br-[100px] bg-base-300"
          )}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
    </div>
  );
}
