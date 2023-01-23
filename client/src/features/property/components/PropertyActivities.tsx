import TitledSection from "@/components/TitledSection";
import { isEmpty } from "lodash-es";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import PropertyTag from "./PropertyTag";

type PropertyActivitiesProps = {
  className: string;
  activities: PropertyActivity[];
};

export default function PropertyActivities(props: PropertyActivitiesProps) {
  return (
    <Fade direction="up" triggerOnce className={props.className}>
      <TitledSection title="Treasure to Choose">
        {isEmpty(props.activities) ? (
          <ActivityEmpty />
        ) : (
          <ActivityList items={props.activities} />
        )}
      </TitledSection>
    </Fade>
  );
}

function ActivityEmpty() {
  return <div className="text-light">There is no activity to display</div>;
}

type ActivityListProps = {
  items: PropertyActivity[];
};

function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="grid grid-cols-4 gap-30px">
      {items.map((activityItem, i) => (
        <Fade
          className="col-span-full sm:col-span-2 xl:col-span-1"
          direction="up"
          triggerOnce
          delay={300 * i}
          key={activityItem._id}
        >
          <ActivityItem item={activityItem} />
        </Fade>
      ))}
    </div>
  );
}

type FeatureItemProps = {
  item: PropertyActivity;
};

function ActivityItem({ item }: FeatureItemProps) {
  const imageUrl = import.meta.env.VITE_CMS_BASE_URL + item.imageUrl;

  return (
    <article className="card rounded-b-none">
      {item.isPopular && (
        <PropertyTag
          className="absolute z-10 right-0"
          highlightedText="Popular"
          text="Choice"
        />
      )}
      <figure className="img-wrapper !h-180px">
        <img src={imageUrl} alt={item.name} />
      </figure>
      <Link
        to={`features/${item._id}`}
        className="app-link stretched-link text-secondary text-xl text-left mt-4"
      >
        <h5>{item.name}</h5>
      </Link>
      <span className="text-light">{item.type}</span>
    </article>
  );
}

export type PropertyActivity = {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
  isPopular: boolean;
};
