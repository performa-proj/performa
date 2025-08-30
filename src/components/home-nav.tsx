import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { Link } from "./core/link";

export const HomeNav = () => (
  <div className="flex items-center min-h-8">
    <Link href="/">
      <Squares2X2Icon className="size-6" />
    </Link>
    <p className="text-base/8 lg:text-lg font-semibold px-3">Point of Sales</p>
  </div>
);
