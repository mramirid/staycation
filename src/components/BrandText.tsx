import Button from "./Button";

export default function BrandText() {
  return (
    <Button
      className="text-[1.6rem] text-primary font-medium hover:no-underline"
      type="link"
      to="/"
    >
      Stay<span className="text-secondary">cation.</span>
    </Button>
  );
}
