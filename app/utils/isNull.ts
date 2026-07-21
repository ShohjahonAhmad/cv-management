import { AttributeType } from "~/types/Attribute";
import type { AttributeValue } from "~/types/Profile";

export function isNull(attributeValue: AttributeValue): boolean {
    switch (attributeValue.attribute.type) {
      case AttributeType.BOOLEAN:
        return attributeValue.booleanValue === null;
      case AttributeType.NUMBER:
        return attributeValue.numericValue === null;
      case AttributeType.STRING:
        return !attributeValue.stringValue?.trim();
      case AttributeType.TEXT:
        return !attributeValue.textValue?.trim();
      case AttributeType.IMAGE:
        return !attributeValue.imageUrl?.trim();
      case AttributeType.DATE:
        return attributeValue.dateValue === null;
      case AttributeType.PERIOD:
        return (
          attributeValue.periodStart === null || attributeValue.periodEnd === null
        );
      case AttributeType.SELECT:
        return attributeValue.optionId === null;
    }
  }
  