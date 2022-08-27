import Tag from "@/components/Tag";
import TitledSection from "@/layouts/TitledSection";
import { formatToUSD } from "@/lib/format";
import { clx } from "@/lib/styling";
import { forwardRef } from "react";
import Fade from "react-reveal/Fade";
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
  <Fade bottom>
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
        <MostPickedItem
          index={i}
          mostPicked={mostPicked}
          key={mostPicked._id}
        />
      ))}
    </div>
  );
}

type MostPickedItemProps = {
  index: number;
  mostPicked: MostPicked;
};

function MostPickedItem({ mostPicked, index }: MostPickedItemProps) {
  const isFirstItem = index === 0;
  const formattedPrice = formatToUSD(mostPicked.price);

  return (
    <Fade bottom delay={500 * index}>
      <article
        className={clx(classes["most-picked-item"], {
          "row-span-2": isFirstItem,
        })}
      >
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
    </Fade>
  );
}
