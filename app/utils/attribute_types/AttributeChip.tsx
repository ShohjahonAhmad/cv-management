import { X } from "lucide-react";

export default function AttributeChip({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <div className="inline-flex items-center m-1 gap-1 px-2 py-0.5 rounded font-medium bg-[#F0F7FF] border dark:border-[#1E3A6E] border-[#BFDBFE] dark:text-[#60A5FA] text-[#1D4ED8] dark:bg-[#0F1E38] text-xs">
      {name}
      <button type="button" className="opacity-70" onClick={onClick}>
        <X className="w-2 h-2" />
      </button>
    </div>
  );
}
