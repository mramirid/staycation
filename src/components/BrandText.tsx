import { clx } from "@/utils/styling";
import { Link } from "react-router-dom";

export default function BrandText() {
  return (
    <Link
      className={clx(
        "app-btn app-btn-link text-[1.625rem] text-primary font-medium",
        "hover:no-underline p-0"
      )}
      to="/"
    >
      Stay<span className="text-secondary">cation.</span>
    </Link>
  );
}
