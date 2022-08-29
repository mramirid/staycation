import TitledSection from "@/components/layouts/TitledSection";
import Tag from "@/components/Tag";
import { formatToUSD } from "@/utils/format";
import { clx } from "@/utils/styling";
import { forwardRef } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import landingPageData from "../assets/data/landing-page.json";
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
  <Fade direction="up" triggerOnce>
    <TitledSection title="Most Picked" sectionClass={props.className} ref={ref}>
      <MostPickedList />
    </TitledSection>
  </Fade>
));

export default MostPickedSection;

function MostPickedList() {
  return (
    <div className="grid grid-rows-2 grid-cols-3 gap-30px h-[28.75rem]">
      {MOST_PICKED.map((mostPicked, i) => (
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
  mostPicked: MostPicked;
};

function MostPickedItem({ mostPicked }: MostPickedItemProps) {
  const formattedPrice = formatToUSD(mostPicked.price);

  return (
    <article className={classes["most-picked-item"]}>
      <figure className={classes["img-wrapper"]}>
        <img src={mostPicked.imageUrl} alt={mostPicked.name} />
      </figure>
      <div className={classes["meta-wrapper"]}>
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
