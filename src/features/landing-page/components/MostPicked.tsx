import Button from "@/components/Button";
import Tag from "@/components/Tag";
import TitledSection from "@/layouts/TitledSection";
import { formatToUSD } from "@/lib/format";
import { clx } from "@/lib/styling";
import { forwardRef } from "react";
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
  <TitledSection title="Most Picked" sectionClass={props.className} ref={ref}>
    <MostPickedList />
  </TitledSection>
));

export default MostPickedSection;

function MostPickedList() {
  return (
    <div className="grid grid-rows-2 grid-cols-3 gap-30px h-[28.75rem]">
      {MOST_PICKED.map((mostPicked, i) => (
        <MostPickedItem
          mostPicked={mostPicked}
          isFirstItem={i === 0}
          key={mostPicked._id}
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
        <img src={mostPicked.imageUrl} alt={mostPicked.name} />
      </figure>
      <div className={classes["meta-wrapper"]}>
        <Button
          type="link"
          to={`/properties/${mostPicked._id}`}
          className="text-inherit text-xl text-left font-normal block"
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
