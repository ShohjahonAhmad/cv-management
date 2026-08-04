import { useState } from "react";
import { useLocation, type FetcherWithComponents } from "react-router";
import { useTranslation } from "react-i18next";
import { Priority } from "~/types/SupportTicket";
import { HelpCircle, X, Lock, Send } from "lucide-react";

const priorityLabels: Record<Priority, string> = {
  [Priority.HIGH]: "help.dialog.high",
  [Priority.AVERAGE]: "help.dialog.average",
  [Priority.LOW]: "help.dialog.low",
};

export default function SupportTicketDialog({
  setOpen,
  fetcher,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetcher: FetcherWithComponents<any>;
}) {
  const { t } = useTranslation();
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const location = useLocation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000080] min-h-screen">
      <fetcher.Form
        method="POST"
        action="/"
        className="flex flex-col rounded-xl overflow-hidden bg-header border border-table-border w-[460px]"
      >
        <input type="hidden" name="priority" value={priority} />
        <input type="hidden" name="link" value={window.location.href} />
        <input type="hidden" name="pathname" value={location.pathname} />
        <div className="flex items-center justify-between px-6 py-4 border-b border-header-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-table-border bg-headere-border">
              <HelpCircle className="w-[15px] h-[15px] text-hr" />
            </div>
            <div>
              <p className="font-semibold text-sm text-nav-text-active">
                {t("help.dialog.title")}
              </p>
              <p className="text-[11px] text-date mt-px">
                {t("help.dialog.subtitle")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-header-border border border-table-border text-date"
          >
            <X className="w-[13px] h-[13px]" />
          </button>
        </div>
        <div className="flex flex-col gap-5 px-6 py-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="summary" className="text-xs font-semibold text-hr">
              {t("help.dialog.summary")}
            </label>
            <input
              type="text"
              id="summary"
              name="summary"
              placeholder={t("help.dialog.summaryPlaceholder")}
              className="px-3 py-2.5 rounded-lg bg-header border border-table-border min-h-12 text-[13px] text-date"
            />
            <p className="text-[11px] text-date">
              {t("help.dialog.summaryHint")}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pr" className="text-xs font-semibold text-hr">
              {t("help.dialog.priority")}
            </label>
            <div className="flex items-center gap-2">
              {Object.values(Priority).map((value) => {
                const key = value as Priority;

                return (
                  <div
                    key={value}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg ${priority === key ? "bg-select-bg border-select-text" : "bg-header border-table-border"} border-[1.5px] cursor-default`}
                    onClick={() => setPriority(key)}
                  >
                    <div
                      className={`w-3 h-3 rounded-full flex items-center justify-center shrink-0 ${priority === key ? "bg-select-text border-select-text" : "bg-table-border border-drag-border"} border-2`}
                    >
                      {priority === key && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span
                      className={`text-[13px] font-semibold ${priority === key ? "text-select-text" : "text-date"}`}
                    >
                      {t(priorityLabels[key])}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-header-border bg-table-header">
          <div className="flex items-center gap-1 text-[11px] text-date">
            <Lock className="w-[10px] h-[10px]" />
            <span>{t("help.dialog.locked")}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-header border border-table-border text-hr"
            >
              {t("help.dialog.cancel")}
            </button>
            <button
              type="submit"
              disabled={fetcher.state !== "idle"}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-nav-border-active text-white"
            >
              <Send className="w-3 h-3" />
              {fetcher.state === "submitting"
                ? t("help.dialog.submitting")
                : t("help.dialog.submit")}
            </button>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
}
