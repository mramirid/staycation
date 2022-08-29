import TitledSection from "@/components/layouts/TitledSection";
import Tag from "@/components/Tag";
import { isEmpty } from "lodash-es";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import landingPageData from "../assets/data/landing-page.json";
import type { Category, CategoryItem as CategoryItemType } from "../types";

const CATEGORIES: Category[] = landingPageData.categories;

export default function Categories() {
  return (
    <Fade direction="up" triggerOnce cascade>
      {CATEGORIES.map((category) => (
        <TitledSection
          title={category.name}
          sectionClass="mt-70px"
          key={category._id}
        >
          {isEmpty(category.items) ? (
            <CategoryEmpty />
          ) : (
            <CategoryList items={category.items} />
          )}
        </TitledSection>
      ))}
    </Fade>
  );
}

function CategoryEmpty() {
  return (
    <div className="text-base-300 font-light">
      There is no property at this category
    </div>
  );
}

type CategoryListProps = {
  items: CategoryItemType[];
};

function CategoryList({ items }: CategoryListProps) {
  return (
    <div className="flex gap-x-30px">
      {items.map((categoryItem, i) => (
        <Fade direction="up" triggerOnce delay={300 * i} key={categoryItem._id}>
          <CategoryItem item={categoryItem} />
        </Fade>
      ))}
    </div>
  );
}

type CategoryItemProps = {
  item: CategoryItemType;
};

function CategoryItem({ item }: CategoryItemProps) {
  return (
    <article className="card rounded-b-none">
      {item.isPopular && (
        <Tag
          className="absolute z-10 right-0"
          highlightedText="Popular"
          text="Choice"
        />
      )}
      <figure>
        <img src={item.imageUrl} alt={item.name} className="object-cover" />
      </figure>
      <Link
        to={`/properties/${item._id}`}
        className="app-link stretched-link text-secondary text-xl text-left mt-4"
      >
        <h5>{item.name}</h5>
      </Link>
      <span className="text-base-300 font-light">
        {item.city},&nbsp;{item.country}
      </span>
    </article>
  );
}
