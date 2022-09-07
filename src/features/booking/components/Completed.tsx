import { ReactComponent as CompletedIlustration } from "../assets/images/completed.svg";

export default function Completed() {
  return (
    <div className="text-center">
      <CompletedIlustration className="inline-block w-[22.625rem] h-[20.625rem]" />
      <p className="text-light text-lg mt-5">
        We will inform you via email later <br /> once the transaction has been
        accepted
      </p>
    </div>
  );
}
