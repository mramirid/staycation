import { Link } from "react-router-dom";

export function CompletedController() {
  return (
    <Link className="app-btn app-btn-primary btn-block" to="/" replace>
      Back to Home
    </Link>
  );
}
