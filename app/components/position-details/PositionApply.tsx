import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { redirect, useNavigate } from "react-router";
import { toast } from "sonner";
import { apply } from "~/api/getCV";

export default function PositionApply({ id }: { id: string | number }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  async function handleApply() {
    const result = await apply(id);

    if (result.success) {
      toast.success(t("page.positionDetails.applySuccess"));
      navigate(`cv/${result.cv!.id}`);
    } else {
      if (result.notFound) {
        toast.error(t("page.positionDetails.applyErrorNotFound"));
      }
    }
  }
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl bg-header border border-table-border">
      <div>
        <p className="text-[13px] font-semibold text-nav-text-active">
          {t("page.positionDetails.applyTitle")}
        </p>
        <p className="text-xs text-nav-text mt-0.5 leading-normal">
          {t("page.positionDetails.applyDescription")}
        </p>
      </div>

      <button
        onClick={handleApply}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold bg-nav-border-active text-white text-[13px]"
      >
        <Send className="w-[13px] h-[13px]" />
        {t("page.positionDetails.apply")}
      </button>
    </div>
  );
}
