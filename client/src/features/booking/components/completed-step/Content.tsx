import { ReactComponent as CompletedIlustration } from "../../assets/images/completed.svg";

export function CompletedContent() {
  return (
    <div className="text-center">
      <CompletedIlustration className="inline-block w-[22.5rem] aspect-square" />
      <p className="text-light text-lg mt-5">
        We will inform you via email later <br /> once the transaction has been
        accepted
      </p>
    </div>
  );
}
