import { clx } from "@/utils/styling";
import { Fade } from "react-awesome-reveal";
import type { ImageUrl } from "../types/property";

type FeaturedImagesProps = {
  imageUrls: ImageUrl[];
};

export default function PropertyImages({ imageUrls }: FeaturedImagesProps) {
  return (
    <section className="h-[31.25rem] grid grid-rows-2 grid-cols-12 gap-10px">
      {imageUrls.map((imageUrl, i) => {
        const isFirst = i === 0;
        return (
          <Fade
            className={clx(
              { "row-span-2": isFirst },
              isFirst ? "col-span-7" : "col-span-5"
            )}
            direction="up"
            triggerOnce
            delay={300 * i}
            key={imageUrl._id}
          >
            <FeatureImage {...imageUrl} />
          </Fade>
        );
      })}
    </section>
  );
}

function FeatureImage(props: ImageUrl) {
  return (
    <figure className="img-wrapper card">
      <img src={props.url} alt={props._id} />
    </figure>
  );
}
