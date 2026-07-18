import { Image, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import EmptyImageState from "../EmptyImageState";
import ImageSpace from "../ImageSpace";
import ReplaceDrag from "../ReplaceDrag";
import { uploadImage } from "~/api/getUsers";
import { useState } from "react";
import { toast } from "sonner";

const acceptedFiles = {
  "image/jpeg": [],
  "image/png": [],
  "image/webp": [],
  "image/gif": [],
};

export default function ImageAttribute({
  id,
  name,
  value,
  onChange,
  onRemove,
}: {
  id: number;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}) {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);
      try {
        setIsUploading(true);
        const result = await uploadImage(formData, id);

        if (!result.success) {
          toast.error(
            result.error || t("page.profile.attributes.toast.imageError")
          );
          return;
        }

        onChange(result.imageUrl);
        toast.success(t("page.profile.attributes.toast.imageUpload"));
      } finally {
        setIsUploading(false);
      }
    },
    accept: acceptedFiles,
    onDropRejected: (rejections) => {
      toast.error(
        rejections[0].errors[0].message ||
          t("page.profile.attributes.toast.imageError")
      );
    },
    maxFiles: 1,
    disabled: isUploading,
  });
  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-header-border">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-image-bg border border-image-border mt-0.5">
        <Image className="w-3 h-3 text-image-text" />
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-nav-text-active ">
            {name}
          </label>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded font-medium bg-image-bg text-image-text border border-image-border text-[10px]">
            {t("type.image")}
          </span>
        </div>
        <div
          {...getRootProps()}
          className={`cursor-pointer transition-opacity ${isUploading && "pointer-events-none opacity-60"} `}
        >
          <input {...getInputProps()} />
          {value ? (
            <>
              <ImageSpace value={value} />
              <ReplaceDrag />
            </>
          ) : (
            <EmptyImageState />
          )}
        </div>
      </div>
      <button
        type="button"
        disabled={isUploading}
        onClick={onRemove}
        className="w-7 h-7 flex items-center justify-center rounded-lg mt-0.5 border border-table-border text-date cursor-pointer hover:bg-table-header disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
