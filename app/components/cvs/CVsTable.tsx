import type { CV } from "~/types/CV";
import { useTranslation } from "react-i18next";
import CVsTableRow from "./CVsTableRow";

export default function CVsTable({ cvs }: { cvs: CV[] }) {
  const { t } = useTranslation();

  return (
    <div className="mx-2 lg:mx-6 rounded-xl overflow-x-auto border border-table-border">
      <table className="w-full table-fixed min-w-225">
        <thead>
          <tr className="bg-table-header border-b border-table-border text-[11px] font-semibold text-nav-text uppercase tracking-[0.06em] text-left">
            <th className="px-4 py-2.5 w-[50%]">
              {t("page.cvs.table.candidate")}
            </th>
            <th className="px-4 py-2.5 w-[35%]">
              {t("page.cvs.table.position")}
            </th>
            <th className="px-4 py-2.5 w-[15%]">
              {t("page.cvs.table.published")}
            </th>
          </tr>
        </thead>
        <tbody>
          {cvs.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-6 text-center text-date">
                {t("page.cvs.empty")}
              </td>
            </tr>
          ) : (
            cvs.map((cv) => <CVsTableRow key={cv.id} cv={cv} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
