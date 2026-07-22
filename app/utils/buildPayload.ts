import { AttributeType } from "~/types/Attribute";
import type { AttributeValue } from "~/types/Profile";

export function buildAttributePayload(attributeValues: AttributeValue[]) {
    const payload = [];
  
    for (const attributeValue of attributeValues) {
      payload.push({
        attributeId: attributeValue.attribute.id,
        type: attributeValue.attribute.type,
        value: getValue(attributeValue),
      });
    }
  
    return payload;
  }
  
export function getValue(attributeValue: AttributeValue) {
    switch (attributeValue.attribute.type) {
      case AttributeType.STRING:
        return attributeValue.stringValue?.trim() || null;
      case AttributeType.NUMBER:
        return attributeValue.numericValue!;
      case AttributeType.BOOLEAN:
        return attributeValue.booleanValue!;
      case AttributeType.TEXT: 
        return attributeValue.textValue?.trim() || null;
      case AttributeType.DATE:
        return attributeValue.dateValue!;
      case AttributeType.PERIOD:
        return {
            startDate: attributeValue.periodStart!,
            endDate: attributeValue.periodEnd!,
        }
      case AttributeType.IMAGE:
        return attributeValue.imageUrl!;
      case AttributeType.SELECT:
        return attributeValue.optionId!;
      default:
        return null;
    }
  }