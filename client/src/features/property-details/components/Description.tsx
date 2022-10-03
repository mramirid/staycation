import TitledSection from "@/components/TitledSection";
import { clx } from "@/utils/styling";
import type { Feature } from "../types";

type DescriptionProps = {
  description: string;
  features: Feature[];
  className: string;
};

export default function Description(props: DescriptionProps) {
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
          <figcaption className="mt-3 text-light">
            <b className="text-semibold">{feature.qty}</b> {feature.name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
