import { getErrorMessage } from "@/utils/error";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <p className="text-lg">{getErrorMessage(error)}</p>
      <Link className="app-btn app-btn-light mt-10" to={`/`}>
        Back to Home
      </Link>
    </div>
  );
}
