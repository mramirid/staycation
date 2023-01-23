import TitledSection from "@/components/TitledSection";
import { PropertyTag } from "@/features/property";
import { isEmpty } from "lodash-es";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

type CategoriesProps = {
  className: string;
  categories: Category[];
};

export type Category = {
  _id: string;
  name: string;
  properties: CategoryProperty[];
};

type CategoryProperty = {
  _id: string;
  title: string;
  imageUrl: string;
  country: string;
  city: string;
  isPopular: boolean;
};

export default function Categories(props: CategoriesProps) {
  return (
    <Fade direction="up" triggerOnce cascade className={props.className}>
      {props.categories.map((category) => (
        <TitledSection title={category.name} key={category._id}>
          {isEmpty(category.properties) ? (
            <CategoryEmpty />
          ) : (
            <CategoryList items={category.properties} />
          )}
        </TitledSection>
      ))}
    </Fade>
  );
}

function CategoryEmpty() {
  return (
    <div className="text-light">There is no property at this category</div>
  );
}

type CategoryListProps = {
  items: CategoryProperty[];
};

function CategoryList({ items }: CategoryListProps) {
  return (
    <div className="grid gap-30px grid-cols-4">
      {items.map((categoryItem, i) => (
        <Fade
          className="col-span-full sm:col-span-2 xl:col-span-1"
          direction="up"
          triggerOnce
          delay={300 * i}
          key={categoryItem._id}
        >
          <CategoryItem item={categoryItem} />
        </Fade>
      ))}
    </div>
  );
}

type CategoryItemProps = {
  item: CategoryProperty;
};

function CategoryItem({ item }: CategoryItemProps) {
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
        <img src={imageUrl} alt={item.title} />
      </figure>
      <Link
        to={`/properties/${item._id}`}
        className="app-link stretched-link text-secondary text-xl text-left mt-4"
      >
        <h5>{item.title}</h5>
      </Link>
      <span className="text-light">
        {item.city},&nbsp;{item.country}
      </span>
    </article>
  );
}
