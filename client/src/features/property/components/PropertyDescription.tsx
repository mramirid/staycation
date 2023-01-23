import TitledSection from "@/components/TitledSection";
import { clx } from "@/utils/styling";

type DescriptionProps = {
  description: string;
  features: PropertyFeature[];
  className: string;
};

export default function PropertyDescription(props: DescriptionProps) {
  return (
    <TitledSection
      title="About the property"
      sectionClass={props.className}
      titleClass="mb-10px"
    >
      <div
        className="text-light leading-7 flex flex-col space-y-10px"
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
      <FeatureList className="mt-30px" features={props.features} />
    </TitledSection>
  );
}

type FeatureListProps = {
  features: PropertyFeature[];
  className: string;
};

function FeatureList(props: FeatureListProps) {
  return (
    <div
      className={clx(
        "grid grid-cols-3 sm:grid-cols-4 gap-x-50px gap-y-5",
        props.className
      )}
    >
      {props.features.map((feature) => (
        <FeatureItem feature={feature} key={feature._id} />
      ))}
    </div>
  );
}

type FeatureItemProps = {
  feature: PropertyFeature;
};

function FeatureItem({ feature }: FeatureItemProps) {
  const iconUrl = import.meta.env.VITE_CMS_BASE_URL + feature.iconUrl;

  return (
    <figure>
      <img src={iconUrl} alt={feature.name} width={38} height={38} />
      <figcaption className="mt-3 text-light">
        <b className="text-semibold">{feature.quantity}</b> {feature.name}
      </figcaption>
    </figure>
  );
}

export type PropertyFeature = {
  _id: string;
  name: string;
  quantity: number;
  iconUrl: string;
};
