import Button from "./Button";

export default function BrandText() {
  return (
    <Button
      className="text-[1.625rem] text-primary font-medium hover:no-underline p-0"
      type="link"
      to="/"
    >
      Stay<span className="text-secondary">cation.</span>
    </Button>
  );
}
