import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "react-router";

export default function CVBuilderSubmit({
  missing,
  published,
}: {
  missing: number;
  published: boolean;
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="flex items-center justify-between px-6 py-4 rounded-xl bg-header border border-table-border">
      <div>
        <p className="text-[13px] font-semibold text-nav-text-active">
          {t("page.cvBuilder.submitTitle")}
        </p>
        {missing > 0 && (
          <p className="text-xs text-nav-text mt-px">
            {t("page.cvBuilder.warning", { count: missing })}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          name="intent"
          value="save"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-header-border border border-table-border text-hr disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("page.cvBuilder.saveDraft")}
        </button>
        <button
          type="submit"
          name="intent"
          value="publish"
          disabled={isSubmitting || missing > 0 || published}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-table-border text-date disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-[13px] h-[13px]" />
          {published
            ? t("page.cvBuilder.published")
            : t("page.cvBuilder.publish")}
        </button>
      </div>
    </div>
  );
}
