import { HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SupportTicketDialog from "./SupportTicketDialog";
import { toast } from "sonner";
import { useFetcher } from "react-router";

export default function SupportTicket() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.success) {
      toast.success(t("help.dialog.success"));
      setOpen(false);
    } else {
      toast.error(t("help.dialog.error"));
    }
  }, [fetcher.data]);

  return (
    <>
      <footer className="flex items-center justify-center px-8 py-6 border-t border-table-border bg-header">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 text-xs text-nav-text font-medium"
        >
          <HelpCircle className="w-3 h-3 shrink-0" />
          {t("help.link")}
        </button>
      </footer>
      {open && <SupportTicketDialog setOpen={setOpen} fetcher={fetcher} />}
    </>
  );
}
