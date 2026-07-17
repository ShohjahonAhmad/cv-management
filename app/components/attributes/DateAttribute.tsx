import { CalendarRange, ChevronDownIcon, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

export default function DateAttribute({
  value,
  name,
  onChange,
  onRemove,
}: {
  value: string;
  name: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-header-border">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-period-bg border border-period-border mt-0.5">
        <CalendarRange className="w-3 h-3 text-period-text" />
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-nav-text-active ">
            {name}
          </label>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded font-medium bg-period-bg text-period-text border border-period-border text-[10px]">
            {t("type.period")}
          </span>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              data-empty={!value}
              className="w-53 flex justify-between rounded-lg border border-table-border bg-table-header px-3 py-2.5 text-left font-normal data-[empty=true]:text-muted-foreground"
            >
              {value ? (
                format(new Date(value), "PPP")
              ) : (
                <span>{t("page.profile.attributes.pickDate")}</span>
              )}
              <ChevronDownIcon data-icon="inline-end" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start" side="right">
            <Calendar
              mode="single"
              selected={value ? new Date(value) : undefined}
              onSelect={(e) => onChange(e ? e.toISOString() : "")}
              defaultMonth={value ? new Date(value) : undefined}
            />
          </PopoverContent>
        </Popover>
      </div>
      <button
        onClick={onRemove}
        type="button"
        className="w-7 h-7 flex items-center justify-center rounded-lg mt-0.5 border border-table-border text-date cursor-pointer hover:bg-table-header"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
