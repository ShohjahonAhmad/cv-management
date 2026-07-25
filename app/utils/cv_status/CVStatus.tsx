import { CheckCircle2 as published, Pencil as draft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CVStatus } from "~/types/CV";

const statusLabels: Record<CVStatus, string> = {
  [CVStatus.DRAFT]: "cv.draft",
  [CVStatus.PUBLISHED]: "cv.published",
};

export default function CVMode({ status }: { status: CVStatus }) {
  const { t } = useTranslation();
  const statusClassNames: Record<CVStatus, string> = {
    [CVStatus.PUBLISHED]:
      "bg-[#F0FDF4] border-[#BBF7D0] text-[#15803D] dark:bg-[#1B3329] dark:border-[#065F46] dark:text-[#6EE7B7]",
    [CVStatus.DRAFT]:
      "bg-[#FEFCE8] border-[#FEF08A] text-[#A16207] dark:bg-[#1E1A08] dark:border-[#3D3208] dark:text-[#FBBF24]",
  };

  const CheckCircle2 = status === CVStatus.PUBLISHED ? published : draft;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border font-medium text-[10px] ${statusClassNames[status]}`}
    >
      <CheckCircle2 className="w-[9px] w-[9px]" />
      {t(statusLabels[status])}
    </span>
  );
}
