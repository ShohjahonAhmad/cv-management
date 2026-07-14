import { X } from "lucide-react";

export default function TagChip({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <div className="inline-flex items-center m-1 gap-1 px-2 py-0.5 rounded font-medium bg-[#fdf4ff] dark:text-[#fdf4ff] text-[#9333ea] dark:bg-[#9333ea] text-xs">
      {name}
      <button type="button" className="opacity-70" onClick={onClick}>
        <X className="w-2 h-2" />
      </button>
    </div>
  );
}
