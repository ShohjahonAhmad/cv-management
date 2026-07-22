import { X, MoveRight, CalendarRange } from "lucide-react";
import { useTranslation } from "react-i18next";
import CalendarInput from "../CalendarInput";

export default function PeriodAttribute({
  name,
  periodStart,
  periodEnd,
  onChangeStart,
  onChangeEnd,
  onRemove,
  readOnly,
}: {
  name: string;
  periodStart: string;
  periodEnd: string;
  onChangeStart: (value: string) => void;
  onChangeEnd: (value: string) => void;
  onRemove: () => void;
  readOnly: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-header-border">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-date-bg border border-date-border mt-0.5">
        <CalendarRange className="w-3 h-3 text-date-text" />
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-nav-text-active ">
            {name}
          </label>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded font-medium bg-date-bg text-date-text border border-date-border text-[10px]">
            {t("type.date")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarInput
            value={periodStart}
            onChange={onChangeStart}
            readOnly={readOnly}
          />
          <MoveRight />
          <CalendarInput
            value={periodEnd}
            onChange={onChangeEnd}
            readOnly={readOnly}
          />
        </div>
      </div>
      {!readOnly && (
        <button
          onClick={onRemove}
          type="button"
          className="w-7 h-7 flex items-center justify-center rounded-lg mt-0.5 border border-table-border text-date cursor-pointer hover:bg-table-header"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
