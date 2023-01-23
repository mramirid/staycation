import { clx } from "@/utils/styling";
import { Fade } from "react-awesome-reveal";

type FeaturedImagesProps = {
  imageUrls: string[];
};

export default function PropertyImages({ imageUrls }: FeaturedImagesProps) {
  return (
    <section
      className={clx(
        "grid grid-rows-[repeat(4,_15.3rem)] grid-cols-12 gap-10px",
        "sm:grid-rows-[repeat(2,_15.3rem)]"
      )}
    >
      {imageUrls.map((imageUrl, i) => {
        const isFirst = i === 0;
        return (
          <Fade
            className={clx("col-span-full", {
              "row-span-2 sm:col-span-7": isFirst,
              "sm:col-span-5": !isFirst,
            })}
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
  const imageUrl = import.meta.env.VITE_CMS_BASE_URL + props.imageUrl;

  return (
    <figure className="img-wrapper card">
      <img src={imageUrl} alt={imageUrl} />
    </figure>
  );
}
