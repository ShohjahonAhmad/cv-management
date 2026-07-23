import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRevalidator } from "react-router";
import { toast } from "sonner";
import { uploadAvatar } from "~/api/getUsers";
import type { Profile } from "~/types/Profile";

const imageFormats = "image/png,image/jpeg,image/webp,image/gif";
const defaultAvatar = "/image.png";

export default function ProfileCard({
  profile,
  readOnly,
}: {
  profile: Profile;
  readOnly: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { revalidate } = useRevalidator();
  const { t } = useTranslation();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    const data = await uploadAvatar(formData);

    if (data.success) {
      revalidate();
      toast.success(t("page.profile.toast.avatarUpdated"));
    } else {
      toast.error(data.error || t("page.profile.toast.avatarUpdateFailed"));
    }
  }
  return (
    <div className="flex flex-col items-center gap-4 px-5 py-6 rounded-xl border border-table-border bg-table-header w-56">
      <div className="relative">
        <input
          value={profile.photoUrl as string}
          name="photoUrl"
          hidden
          readOnly
        />
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
        {!readOnly && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center bg-nav-border-active border-2 border-header"
          >
            <Camera className="w-3 h-3 text-white" />
          </button>
        )}
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
  );
}
