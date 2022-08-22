import Button from "./Button";
import classes from "./BrandText.module.scss";

export default function BrandText() {
  return (
    <Button className={classes["brand-text"]} type="link" to="/">
      Stay<span className="text-secondary">cation.</span>
    </Button>
  );
}
