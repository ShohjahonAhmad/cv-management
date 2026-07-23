import { useTranslation } from "react-i18next";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useRevalidator,
} from "react-router";
import {
  addAttributes,
  getProfile,
  getProfileById,
  updateProfile,
} from "~/api/getUsers";
import type { Route } from "./+types/profile";
import type { AttributeValue, Profile, UpdateProfile } from "~/types/Profile";
import { ProfileSchema } from "~/schemas";
import { buildErrors } from "~/utils/buildErrors";
import { useEffect, useState } from "react";
import AddAddributeDialog from "~/components/AddAttributeDialog";
import { toast } from "sonner";
import ProfileHeader from "~/components/profile/ProfileHeader";
import ProfileCard from "~/components/profile/ProfileCard";
import ProfileBasicInfo from "~/components/profile/ProfileBasicInfo";
import ProfileAttributes from "~/components/profile/ProfileAttributes";

export async function clientLoader({ params }: Route.LoaderArgs) {
  if (params.id) {
    return getProfileById(params.id);
  }
  return await getProfile();
}

async function updateAttributeValues(formData: FormData) {
  const id = formData.get("id") as string;
  const profile: UpdateProfile = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    headline: formData.get("headline") as string,
    phone: formData.get("phone") as string,
    photoUrl: formData.get("photoUrl") as string,
    location: formData.get("location") as string,
    aboutMe: formData.get("aboutMe") as string,
    updatedAt: formData.get("updatedAt") as string,
    attributeValues: JSON.parse(
      formData.get("attributeValues") as string
    ) as AttributeValue[],
  };

  const result = ProfileSchema.safeParse(profile);

  if (!result.success) {
    return {
      success: false,
      errors: buildErrors(result.error),
    };
  }

  const data = await updateProfile(id, result.data);

  return data;
}

async function addAttribute(formData: FormData) {
  const attributeIds = formData.getAll("attributeIds") as string[];

  const result = await addAttributes(attributeIds);

  return { ...result, addAttributes: true };
}

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  switch (formData.get("intent")) {
    case "updateAttributeValues":
      return updateAttributeValues(formData);
    case "addAttributes":
      return addAttribute(formData);
    default:
      throw new Response("Unknown action", { status: 400 });
  }
}

export default function Profile() {
  const { t } = useTranslation();
  const { profile, readOnly } = useLoaderData();
  const actionData = useActionData();
  const { revalidate } = useRevalidator();
  const [errors, setErrors] = useState<string[] | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setErrors(null);
  }, [isSubmitting]);

  useEffect(() => {
    if (!actionData) return;

    if (actionData.success) {
      setIsOpen(false);
      revalidate();
      if (actionData.addAttributes) {
        toast.success(
          t("page.profile.attributes.toast.attributesAdded", {
            count: actionData.count,
          })
        );
      } else {
        toast.success(t("page.profile.toast.profileUpdated"));
      }
    } else {
      if (actionData.addAttributes) {
        toast.error(
          actionData.error ||
            t("page.profile.attributes.toast.attributesAddFailed")
        );
      } else {
        if (actionData.conflict) {
          toast.error(t("page.profile.toast.profileUpdateConflict"));
          revalidate();
        } else {
          setErrors(actionData.errors);
        }
      }
    }
  }, [actionData]);

  return (
    <main>
      <Form method="POST">
        <input type="hidden" name="id" id="id" value={profile.id} />
        <input
          type="hidden"
          name="updatedAt"
          id="updatedAt"
          value={profile.updatedAt}
        />
        <input type="hidden" name="intent" value="updateAttributeValues" />
        <ProfileHeader readOnly={readOnly} />
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 px-2 lg:px-8 py-6">
          <ProfileCard profile={profile} readOnly={readOnly} />
          <div className="flex flex-col gap-5 flex-1 min-w-0">
            <ProfileBasicInfo
              profile={profile}
              errors={errors}
              readOnly={readOnly}
            />
            <ProfileAttributes
              profile={profile}
              setIsOpen={setIsOpen}
              readOnly={readOnly}
            />
          </div>
        </div>
      </Form>
      {isOpen && <AddAddributeDialog setIsOpen={setIsOpen} />}
    </main>
  );
}
