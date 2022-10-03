import Tag from "@/components/Tag";
import TitledSection from "@/components/TitledSection";
import { formatToUSD } from "@/utils/format";
import { clx } from "@/utils/styling";
import { forwardRef } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { mostPicked as MOST_PICKED_LIST } from "../assets/landing-page.data.json";
import classes from "./MostPicked.module.scss";

type MostPickedType = {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
  country: string;
  city: string;
  price: number;
  unit: string;
};

type MostPickedProps = {
  className: string;
};

const MostPicked = forwardRef<HTMLDivElement, MostPickedProps>((props, ref) => (
  <div ref={ref} className={props.className}>
    <Fade direction="up" triggerOnce>
      <TitledSection title="Most Picked" ref={ref}>
        <MostPickedList />
      </TitledSection>
    </Fade>
  </div>
));

export default MostPicked;

function MostPickedList() {
  return (
    <div className="grid grid-rows-2 grid-cols-3 gap-30px h-[28.75rem]">
      {MOST_PICKED_LIST.map((mostPicked, i) => (
        <Fade
          className={clx({ "row-span-2": i === 0 })}
          direction="up"
          triggerOnce
          delay={500 * i}
          key={mostPicked._id}
        >
          <MostPickedItem mostPicked={mostPicked} />
        </Fade>
      ))}
    </div>
  );
}

type MostPickedItemProps = {
  mostPicked: MostPickedType;
};

function MostPickedItem({ mostPicked }: MostPickedItemProps) {
  const formattedPrice = formatToUSD(mostPicked.price);

  return (
    <article className={classes.mostPickedItem}>
      <figure
        className={clx("img-wrapper", classes.mostPickedItem__imgWrapper)}
      >
        <img src={mostPicked.imageUrl} alt={mostPicked.name} />
      </figure>
      <div className={classes.mostPickedItem__metaWrapper}>
        <h5 className="text-xl">{mostPicked.name}</h5>
        <span className="font-light">
          {mostPicked.city},&nbsp;{mostPicked.country}
        </span>
      </div>
      <Tag
        className="absolute z-10 right-0"
        highlightedText={formattedPrice}
        text={`per ${mostPicked.unit}`}
      />
      <Link
        to={`/properties/${mostPicked._id}`}
        className="app-link stretched-link"
      />
    </article>
  );
}
