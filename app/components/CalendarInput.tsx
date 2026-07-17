import { ChevronDownIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

export default function CalendarInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { t } = useTranslation();
  return (
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
  );
}
