import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { classnames } from "./classnames";

export const ReloadButton = ({
  isLoading,
  onClick,
}: {
  isLoading: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    className="bg-white rounded-md px-2.5 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
    onClick={onClick}
  >
    <ArrowPathIcon
      className={classnames(isLoading ? "animate-spin" : "", `size-4 text-gray-900`)}
    />
  </button>
);
