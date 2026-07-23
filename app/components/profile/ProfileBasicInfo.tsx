import { User, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import ErrorBanner from "../ErrorBanner";
import type { Profile } from "~/types/Profile";

export default function ProfileBasicInfo({
  profile,
  errors,
  readOnly,
}: {
  profile: Profile;
  errors: string[] | null;
  readOnly: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl overflow-hidden border border-table-border bg-table-header">
      <div className="flex items-center justify-between px-6 py-4 border-b border-header-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-header-border border border-table-border">
            <User className="w-3.5 h-3.5 text-hr" />
          </div>
          <div>
            <p className="font-semibold text-sm text-nav-text-active">
              {t("page.profile.basicInformation.title")}
            </p>
            <p className="text-xs text-nav-text mt-0.5">
              {t("page.profile.basicInformation.subtitle")}
            </p>
          </div>
        </div>
      </div>
      {errors && errors.length > 0 && <ErrorBanner errors={errors} />}
      <div className="px-6 py-5">
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="firstName" className="text-xs font-medium text-hr">
              {t("page.profile.basicInformation.firstName")}
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              disabled={readOnly}
              defaultValue={profile.firstName}
              className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
              placeholder={t(
                "page.profile.basicInformation.firstNamePlaceholder"
              )}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="lastName" className="text-xs font-medium text-hr">
              {t("page.profile.basicInformation.lastName")}
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              disabled={readOnly}
              defaultValue={profile.lastName}
              className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
              placeholder={t(
                "page.profile.basicInformation.lastNamePlaceholder"
              )}
            />
          </div>
        </div>
        <div className="flex gap-1.5 flex-col mt-4">
          <label htmlFor="headline" className="text-xs font-medium text-hr">
            {t("page.profile.basicInformation.headline")}
          </label>
          <input
            id="headline"
            type="text"
            name="headline"
            disabled={readOnly}
            defaultValue={profile.headline as string}
            maxLength={100}
            className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
            placeholder={t("page.profile.basicInformation.headlinePlaceholder")}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full mt-4">
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="phone" className="text-xs font-medium text-hr">
              {t("page.profile.basicInformation.phone")}
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              disabled={readOnly}
              defaultValue={profile.phone as string}
              className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
              placeholder={t("page.profile.basicInformation.phonePlaceholder")}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="location" className="text-xs font-medium text-hr">
              {t("page.profile.basicInformation.location")}
            </label>
            <input
              id="location"
              type="text"
              name="location"
              disabled={readOnly}
              defaultValue={profile.location as string}
              className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
              placeholder={t(
                "page.profile.basicInformation.locationPlaceholder"
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 mt-4">
          <div className="flex gap-2">
            <label htmlFor="email" className="text-xs font-medium text-hr">
              {t("page.profile.basicInformation.email")}
            </label>
            <span className="flex rounded gap-1 px-1.5 py-0.5 items-center bg-header-border text-date text-[10px] border-table-border">
              <Lock className="w-2.5 h-2.5 text-date ml-1" />
              {t("page.profile.basicInformation.readonly")}
            </span>
          </div>
          <input
            id="email"
            type="text"
            name="email"
            disabled={true}
            defaultValue={profile.email}
            className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active disabled:bg-header-border"
            placeholder={t("page.profile.basicInformation.emailPlaceholder")}
          />
          <p className="text-xs text-date">
            {t("page.profile.basicInformation.emailPolicy")}
          </p>
        </div>
        <div className="flex flex-col gap-1.5 mt-4">
          <label htmlFor="aboutMe" className="text-xs font-medium text-hr">
            {t("page.profile.basicInformation.aboutMe")}
          </label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            disabled={readOnly}
            defaultValue={profile.aboutMe as string}
            rows={6}
            maxLength={500}
            className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
            placeholder={t("page.profile.basicInformation.aboutMePlaceholder")}
          />
        </div>
      </div>
    </div>
  );
}
