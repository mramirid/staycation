import Tag from "@/components/Tag";
import TitledSection from "@/components/TitledSection";
import { isEmpty } from "lodash-es";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import type { Activity } from "../types/property";

type ActivitiesProps = {
  className: string;
  activities: Activity[];
};

export default function Activities(props: ActivitiesProps) {
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
  items: Activity[];
};

function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="grid grid-cols-4 gap-x-30px">
      {items.map((activityItem, i) => (
        <Fade direction="up" triggerOnce delay={300 * i} key={activityItem._id}>
          <ActivityItem item={activityItem} />
        </Fade>
      ))}
    </div>
  );
}

type FeatureItemProps = {
  item: Activity;
};

function ActivityItem({ item }: FeatureItemProps) {
  return (
    <article className="card rounded-b-none">
      {item.isPopular && (
        <Tag
          className="absolute z-10 right-0"
          highlightedText="Popular"
          text="Choice"
        />
      )}
      <figure className="img-wrapper !h-180px">
        <img src={item.imageUrl} alt={item.name} />
      </figure>
      <Link
        to="#"
        className="app-link stretched-link text-secondary text-xl text-left mt-4"
      >
        <h5>{item.name}</h5>
      </Link>
      <span className="text-light">{item.type}</span>
    </article>
  );
}
