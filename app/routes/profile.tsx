import {
  Camera,
  Layers,
  Lock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useRevalidator,
} from "react-router";
import { getProfile, updateProfile, uploadAvatar } from "~/api/getUsers";
import type { Route } from "./+types/profile";
import type { AttributeValue, UpdateProfile } from "~/types/Profile";
import { ProfileSchema } from "~/schemas";
import { buildErrors } from "~/utils/buildErrors";
import { useEffect, useRef, useState } from "react";
import ErrorBanner from "~/components/ErrorBanner";
import Attribute from "~/components/attributes/AttributeValue";

export async function clientLoader() {
  return await getProfile();
}

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const profile: UpdateProfile = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    headline: formData.get("headline") as string,
    phone: formData.get("phone") as string,
    photoUrl: formData.get("photoUrl") as string,
    location: formData.get("location") as string,
    aboutMe: formData.get("aboutMe") as string,
    attributeValues: [],
  };

  const result = ProfileSchema.safeParse(profile);

  if (!result.success) {
    return {
      success: false,
      errors: buildErrors(result.error),
    };
  }

  const data = await updateProfile(result.data);

  return data;
}
const imageFormats = "image/png,image/jpeg,image/webp,image/gif";
const defaultAvatar = "/image.png";

export default function Profile() {
  const { t } = useTranslation();
  const { profile } = useLoaderData();
  const actionData = useActionData();
  const { revalidate } = useRevalidator();
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [attributeValues, setAttributeValues] = useState<AttributeValue[]>(
    profile.attributeValues || []
  );
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(attributeValues);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 10000);

    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    setErrors(null);
    setMessage(null);
  }, [isSubmitting]);

  useEffect(() => {
    if (!actionData) return;

    if (actionData.success) {
      setMessage(t("page.profile.toast.profileUpdated"));
      revalidate();
    } else {
      setErrors(actionData.errors);
    }
  }, [actionData]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    const data = await uploadAvatar(formData);

    if (data.success) {
      revalidate();
      setMessage(t("page.profile.toast.avatarUpdated"));
    } else {
      setMessage(data.error || t("page.profile.toast.avatarUpdateFailed"));
    }
  }
  return (
    <main>
      {message && (
        <div className="fixed top-4 right-4 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg z-50 border dark:bg-[#1a1a20] border-[#d1fae5] dark:border-[#1c3828]">
          <div>
            <p className="font-semibold text-sm text-nav-text-active">
              {t("page.attribute.changesSaved")}
            </p>
            <p className="text-xs text-nav-text">{message}</p>
          </div>
        </div>
      )}
      <Form method="POST">
        <div className="px-8 py-5 flex items-center justify-between border-b border-header-border">
          <div>
            <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
              {t("page.profile.title")}
            </h1>
            <p className="text-xs text-nav-text mt-0.5 max-w-130">
              {t("page.profile.subtitle")}
            </p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-nav-border-active text-white cursor-pointer">
            <Save className="w-3.5 h-3.5 text-white" />
            {t("page.profile.save")}
          </button>
        </div>
        <div className="flex items-start gap-6 px-8 py-6">
          <div className="flex flex-col items-center gap-4 px-5 py-6 rounded-xl border border-table-border bg-table-header w-56">
            <div className="relative">
              <input value={profile.photoUrl} hidden readOnly />
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept={imageFormats}
                onChange={handleFileChange}
              />

              <img
                src={profile.photoUrl || defaultAvatar}
                className="w-24 rounded-full"
                alt="Avatar Image"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center bg-nav-border-active border-2 border-header"
              >
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <p className="font-semibold text-base text-nav-text-active">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="text-xs text-nav-text leading-[1.4] wrap-break-word">
                {profile.headline || t("page.profile.fallback.headline")}
              </p>
            </div>
            <div className="w-full flex flex-col gap-1.5 pt-3 border-t border-header-border">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-date" />
                <span className="text-xs text-nav-text">
                  {profile.location || t("page.profile.fallback.location")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-date" />
                <span className="text-xs text-nav-text">
                  {profile.phone || t("page.profile.fallback.phone")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-date" />
                <span className="text-xs text-nav-text truncate">
                  {profile.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 flex-1 min-w-0">
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
                <div className="flex gap-4 w-full">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label
                      htmlFor="firstName"
                      className="text-xs font-medium text-hr"
                    >
                      {t("page.profile.basicInformation.firstName")}
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      defaultValue={profile.firstName}
                      className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
                      placeholder={t(
                        "page.profile.basicInformation.firstNamePlaceholder"
                      )}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-medium text-hr"
                    >
                      {t("page.profile.basicInformation.lastName")}
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      defaultValue={profile.lastName}
                      className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
                      placeholder={t(
                        "page.profile.basicInformation.lastNamePlaceholder"
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-1.5 flex-col mt-4">
                  <label
                    htmlFor="headline"
                    className="text-xs font-medium text-hr"
                  >
                    {t("page.profile.basicInformation.headline")}
                  </label>
                  <input
                    id="headline"
                    type="text"
                    name="headline"
                    defaultValue={profile.headline}
                    maxLength={100}
                    className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
                    placeholder={t(
                      "page.profile.basicInformation.headlinePlaceholder"
                    )}
                  />
                </div>
                <div className="flex gap-4 w-full mt-4">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label
                      htmlFor="phone"
                      className="text-xs font-medium text-hr"
                    >
                      {t("page.profile.basicInformation.phone")}
                    </label>
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      defaultValue={profile.phone}
                      className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
                      placeholder={t(
                        "page.profile.basicInformation.phonePlaceholder"
                      )}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label
                      htmlFor="location"
                      className="text-xs font-medium text-hr"
                    >
                      {t("page.profile.basicInformation.location")}
                    </label>
                    <input
                      id="location"
                      type="text"
                      name="location"
                      defaultValue={profile.location}
                      className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
                      placeholder={t(
                        "page.profile.basicInformation.locationPlaceholder"
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-4">
                  <div className="flex gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-medium text-hr"
                    >
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
                    placeholder={t(
                      "page.profile.basicInformation.emailPlaceholder"
                    )}
                  />
                  <p className="text-xs text-date">
                    {t("page.profile.basicInformation.emailPolicy")}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 mt-4">
                  <label
                    htmlFor="aboutMe"

                    className="text-xs font-medium text-hr"
                  >
                    {t("page.profile.basicInformation.aboutMe")}
                  </label>
                  <textarea
                    id="aboutMe"
                    name="aboutMe"
                    defaultValue={profile.aboutMe}
                    rows={6}
                    maxLength={500}
                    className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border text-sm text-nav-text-active"
                    placeholder={t(
                      "page.profile.basicInformation.aboutMePlaceholder"
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-table-border bg-table-header">
              <div className="flex items-center justify-between px-6 py-4 border-b border-header-border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-header-border border border-table-border">
                    <Layers className="w-3.5 h-3.5 text-hr" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-nav-text-active">
                      {t("page.profile.attributes.title")}
                    </p>
                    <p className="text-xs text-nav-text mt-0.5">
                      {t("page.profile.attributes.subtitle")}
                    </p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-header-border border border-table-border">
                  <Plus className="w-3 h-3 text-hr" />
                  <span className="text-hr">
                    {t("page.profile.attributes.addAttribute")}
                  </span>
                </button>
              </div>
              <div className="px-6 py-5">
                <div className="flex flex-col">
                  {attributeValues.map((attributeValue) => (
                    <Attribute
                      key={attributeValue.id}
                      attributeValue={attributeValue}
                      setAttributeValues={setAttributeValues}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </main>
  );
}
