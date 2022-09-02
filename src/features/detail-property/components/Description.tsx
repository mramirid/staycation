import TitledSection from "@/components/TitledSection";
import { clx } from "@/utils/styling";
import type { Feature } from "../types";

type Props = {
  description: string;
  features: Feature[];
  className: string;
};

export default function Description(props: Props) {
  return (
    <TitledSection
      title="About the property"
      sectionClass={props.className}
      titleClass="mb-[0.625rem]"
    >
      <div
        className="text-light leading-7"
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
      <Features className="mt-30px" features={props.features} />
    </TitledSection>
  );
}

type FeaturesProps = {
  features: Feature[];
  className: string;
};

function Features(props: FeaturesProps) {
  return (
    <div
      className={clx("grid grid-cols-4 gap-x-50px gap-y-5", props.className)}
    >
      {props.features.map((feature) => (
        <figure key={feature._id}>
          <img
            src={feature.imageUrl}
            alt={feature.name}
            width={38}
            height={38}
          />
          <figcaption className="mt-3 text-secondary">
            {feature.qty} <span className="text-light">{feature.name}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
