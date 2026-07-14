import { X } from "lucide-react";

export default function AttributeChip({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <div className="inline-flex items-center m-1 gap-1 px-2 py-0.5 rounded font-medium bg-[#fefce8] dark:text-[#fefce8] text-[#a16207] dark:bg-[#a16207] text-xs">
      {name}
      <button type="button" className="opacity-70" onClick={onClick}>
        <X className="w-2 h-2" />
      </button>
    </div>
  );
}
