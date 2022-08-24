import landingPageData from "@/assets/data/landing-page.json";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import Section from "@/layouts/Section";
import { formatToUSD } from "@/lib/format";
import { clx } from "@/lib/styling";
import { nanoid } from "@reduxjs/toolkit";
import { forwardRef } from "react";
import classes from "./MostPicked.module.scss";

type MostPicked = {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
  country: string;
  city: string;
  price: number;
  unit: string;
};

type Props = {
  className: string;
};

const MOST_PICKED: MostPicked[] = landingPageData.mostPicked;

const MostPickedSection = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <Section title="Most Picked" sectionClass={props.className} ref={ref}>
    <MostPickedList />
  </Section>
));

export default MostPickedSection;

function MostPickedList() {
  return (
    <div className="grid grid-rows-2 grid-cols-3 gap-[1.875rem] h-[28.75rem]">
      {MOST_PICKED.map((mostPicked, i) => (
        <MostPickedItem
          mostPicked={mostPicked}
          isFirstItem={i === 0}
          key={nanoid()} // TODO: Change this to id
        />
      ))}
    </div>
  );
}

type MostPickedItemProps = {
  mostPicked: MostPicked;
  isFirstItem: boolean;
};

function MostPickedItem({ mostPicked, isFirstItem }: MostPickedItemProps) {
  const formattedPrice = formatToUSD(mostPicked.price);

  return (
    <article
      className={clx(classes["most-picked-item"], {
        "row-span-2": isFirstItem,
      })}
    >
      <figure className={classes["img-wrapper"]}>
        <img
          src={mostPicked.imageUrl}
          alt={mostPicked.name}
          className="object-cover h-full w-full"
        />
      </figure>
      <div className={classes["meta-wrapper"]}>
        <Button
          type="link"
          to={`/properties/${mostPicked._id}`}
          className="text-inherit text-xl text-left block"
        >
          <h5>{mostPicked.name}</h5>
        </Button>
        <span className="text-inherit font-light">
          {mostPicked.city},&nbsp;{mostPicked.country}
        </span>
      </div>
      <Tag
        className="absolute z-10 right-0"
        highlightedText={formattedPrice}
        text={`per ${mostPicked.unit}`}
      />
    </article>
  );
}
