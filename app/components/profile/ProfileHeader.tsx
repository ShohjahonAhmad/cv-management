import { Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "react-router";

export default function ProfileHeader({ readOnly }: { readOnly: boolean }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="px-8 py-5 flex items-center justify-between border-b border-header-border">
      <div>
        <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
          {t("page.profile.title")}
        </h1>
        <p className="text-xs text-nav-text mt-0.5 max-w-130">
          {t("page.profile.subtitle")}
        </p>
      </div>

      {!readOnly && (
        <button
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-nav-border-active text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-3.5 h-3.5 text-white" />
          {t("page.profile.save")}
        </button>
      )}
    </div>
  );
}
