import TitledSection from "@/components/TitledSection";
import { PropertyTag } from "@/features/property";
import { formatToUSD } from "@/utils/format";
import { clx } from "@/utils/styling";
import { forwardRef } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import classes from "./MostPicked.module.scss";

type MostPickedProps = {
  mostPickedProperties: MostPickedProperty[];
  className: string;
};

const MostPicked = forwardRef<HTMLDivElement, MostPickedProps>((props, ref) => (
  <div ref={ref} className={props.className}>
    <Fade direction="up" triggerOnce>
      <TitledSection title="Most Picked" ref={ref}>
        <MostPickedList mostPickedProperties={props.mostPickedProperties} />
      </TitledSection>
    </Fade>
  </div>
));

export default MostPicked;

type MostPickedListProps = {
  mostPickedProperties: MostPickedProperty[];
};

function MostPickedList({ mostPickedProperties }: MostPickedListProps) {
  return (
    <div
      className={clx(
        "grid gap-30px grid-rows-[repeat(6,_13.5rem)]",
        "sm:grid-rows-[repeat(4,_13.5rem)] sm:grid-cols-2",
        "xl:grid-rows-[repeat(2,_13.5rem)] xl:grid-cols-3"
      )}
    >
      {mostPickedProperties.map((mostPickedProperty, i) => (
        <Fade
          className={clx({ "row-span-2 col-span-full xl:col-span-1": i === 0 })}
          direction="up"
          triggerOnce
          delay={500 * i}
          key={mostPickedProperty._id}
        >
          <MostPickedItem mostPickedProperty={mostPickedProperty} />
        </Fade>
      ))}
    </div>
  );
}

type MostPickedItemProps = {
  mostPickedProperty: MostPickedProperty;
};

function MostPickedItem({ mostPickedProperty }: MostPickedItemProps) {
  const formattedPrice = formatToUSD(mostPickedProperty.price);
  const imageUrl =
    import.meta.env.VITE_CMS_BASE_URL + mostPickedProperty.imageUrl;

  return (
    <article className={classes.mostPickedItem}>
      <figure
        className={clx("img-wrapper", classes.mostPickedItem__imgWrapper)}
      >
        <img src={imageUrl} alt={mostPickedProperty.title} />
      </figure>
      <div className={classes.mostPickedItem__metaWrapper}>
        <h5 className="text-xl">{mostPickedProperty.title}</h5>
        <span className="font-light">
          {mostPickedProperty.city},&nbsp;{mostPickedProperty.country}
        </span>
      </div>
      <PropertyTag
        className="absolute z-10 right-0"
        highlightedText={formattedPrice}
        text={`per ${mostPickedProperty.unit}`}
      />
      <Link
        to={`/properties/${mostPickedProperty._id}`}
        className="app-link stretched-link"
      />
    </article>
  );
}

export type MostPickedProperty = {
  _id: string;
  title: string;
  unit: string;
  city: string;
  country: string;
  imageUrl: string;
  price: number;
};
