import { useTranslation } from "react-i18next";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router";
import CVBuilderHeader from "~/components/cv-builder/CVBuilderHeader";
import CVBuilderProfile from "~/components/cv-builder/CVBuilderProfile";
import CVBuilderWarning from "~/components/cv-builder/CVBuilderWarning";
import type { Route } from "./+types/cv-builder";
import { getCV, publishCV, updateCV } from "~/api/getCV";
import Attribute from "~/components/attributes/AttributeValue";
import { buildAttributePayload } from "~/utils/buildPayload";
import { useEffect, useState } from "react";
import { isNull } from "~/utils/isNull";
import type { AttributeValue } from "~/types/Profile";
import { toast } from "sonner";
import CVBuilderSubmit from "~/components/cv-builder/CVBuilderSubmit";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { cvId } = params;
  return await getCV(cvId);
}

export async function clientAction({ request, params }: Route.ActionArgs) {
  const { cvId } = params;
  const formData = await request.formData();

  const intent = formData.get("intent") as "save" | "publish";
  const attributeValues = JSON.parse(
    formData.get("attributeValues") as string
  ) as AttributeValue[];

  switch (intent) {
    case "save":
      return await updateCV(cvId, attributeValues);

    case "publish":
      const update = await updateCV(cvId, attributeValues);
      if (!update.success) {
        return update;
      }
      return await publishCV(cvId);

    default:
      throw new Error("Invalid intent");
  }
}

export default function CVBuilder() {
  const { t } = useTranslation();
  const {
    cv,
    attributeValues: initialValues,
    readOnly,
  } = useLoaderData<typeof clientLoader>();
  const actionData = useActionData<typeof clientAction>();
  const [attributeValues, setAttributeValues] = useState(initialValues);
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();
  const missing = initialValues.filter(isNull).length;
  console.log(attributeValues);

  useEffect(() => {
    setAttributeValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    if (!actionData) return;

    if (actionData.success) {
      if (actionData.published) {
        toast.success(t("page.cvBuilder.publishSuccess"));
        navigate("/");
      } else {
        toast.success(t("page.cvBuilder.saveSuccess"));
        revalidate();
      }
    } else {
      if (actionData.notFound) {
        toast.error(t("page.cvBuilder.cvNotFound"));
        navigate("/");
      } else {
        toast.error(actionData.error || t("page.cvBuilder.saveError"));
      }
    }
  }, [actionData]);

  return (
    <Form
      method="POST"
      className="flex flex-col min-h-screen items-center bg-table-header"
    >
      <CVBuilderHeader position={cv.position} readOnly={readOnly} />
      <div className="flex items-start gap-6 px-8 py-6 max-w-[1280px] w-full">
        <CVBuilderProfile
          profile={cv.candidate}
          missing={missing}
          all={initialValues.length}
        />
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          {missing > 0 && <CVBuilderWarning missing={missing} />}
          <div className="rounded-xl overflow-hidden border border-table-border bg-header">
            <div className="px-6 py-5">
              <div className="flex flex-col">
                {attributeValues.map((attributeValue) => (
                  <Attribute
                    key={attributeValue.id}
                    readOnly={readOnly}
                    attributeValue={attributeValue}
                    setAttributeValues={setAttributeValues}
                  />
                ))}
                <input
                  hidden
                  readOnly
                  name="attributeValues"
                  value={JSON.stringify(buildAttributePayload(attributeValues))}
                />
              </div>
            </div>
          </div>
          {!readOnly && (
            <CVBuilderSubmit
              missing={missing}
              published={cv.status === "PUBLISHED"}
            />
          )}
        </div>
      </div>
    </Form>
  );
}
