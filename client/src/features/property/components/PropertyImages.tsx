import { clx } from "@/utils/styling";
import { Fade } from "react-awesome-reveal";

type FeaturedImagesProps = {
  imageUrls: string[];
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
            key={i}
          >
            <FeatureImage imageUrl={imageUrl} />
          </Fade>
        );
      })}
    </section>
  );
}

type FeaturedImageProps = {
  imageUrl: string;
};

function FeatureImage(props: FeaturedImageProps) {
  const imageUrl = import.meta.env.VITE_BACKEND_BASE_URL + props.imageUrl;

  return (
    <figure className="img-wrapper card">
      <img src={imageUrl} alt={imageUrl} />
    </figure>
  );
}
