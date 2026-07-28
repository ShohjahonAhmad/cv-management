import type { AttributeOption } from "~/schemas";

export default function getAttributeOptions(formData: FormData): AttributeOption[] {
  const attributeOptions: AttributeOption[] = [];

  for (let i = 0; ; i++) {
    const value = formData.get(`attributeOptions[${i}].value`);

    if (value === null) break;

    const id = formData.get(`attributeOptions[${i}].id`);

    attributeOptions.push({
      ...(id && { id: Number(id) }),
      value: String(value),
    });
  }

  return attributeOptions;
}