import type { AttributeValue } from "~/types/Profile";
import StringAttribute from "./StringAttribute";
import BooleanAttribute from "./BooleanAttribute";
import NumberAttribute from "./NumberAttribute";
import TextAttribute from "./TextAttribute";
import { AttributeType } from "~/types/Attribute";
import PeriodAttribute from "./PeriodAttributes";
import DateAttribute from "./DateAttribute";
import ImageAttribute from "./ImageAttribute";
import SelectAttribute from "./SelectAttribute";

export default function Attribute({
  attributeValue,
  setAttributeValues,
}: {
  attributeValue: AttributeValue;
  setAttributeValues: React.Dispatch<React.SetStateAction<AttributeValue[]>>;
}) {
  function handleRemove(id: number) {
    setAttributeValues((prev) => prev.filter((attr) => attr.id !== id));
  }

  console.log(attributeValue);

  const name = attributeValue.attribute.name;
  const id = attributeValue.id;
  switch (attributeValue.attribute.type) {
    case AttributeType.STRING:
      return (
        <StringAttribute
          name={name}
          value={attributeValue.stringValue!}
          onChange={(value: string) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === id ? { ...attr, stringValue: value } : attr
              )
            )
          }
          onRemove={() => handleRemove(id)}
        />
      );
    case AttributeType.NUMBER:
      return (
        <NumberAttribute
          name={name}
          value={attributeValue.numericValue!}
          onChange={(value) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === id ? { ...attr, numericValue: value } : attr
              )
            )
          }
          onRemove={() => handleRemove(id)}
        />
      );
    case AttributeType.BOOLEAN:
      return (
        <BooleanAttribute
          name={name}
          value={attributeValue.booleanValue!}
          onChange={(value) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === id ? { ...attr, booleanValue: value } : attr
              )
            )
          }
          onRemove={() => handleRemove(id)}
        />
      );
    case AttributeType.TEXT:
      return (
        <TextAttribute
          name={name}
          value={attributeValue.textValue!}
          onChange={(value) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === id ? { ...attr, textValue: value } : attr
              )
            )
          }
          onRemove={() => handleRemove(id)}
        />
      );
    case AttributeType.DATE:
      return (
        <DateAttribute
          name={name}
          value={attributeValue.dateValue!}
          onChange={(value) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === id ? { ...attr, dateValue: value } : attr
              )
            )
          }
          onRemove={() => handleRemove(id)}
        />
      );
    case AttributeType.PERIOD:
      return (
        <PeriodAttribute
          name={name}
          periodStart={attributeValue.periodStart!}
          periodEnd={attributeValue.periodEnd!}
          onChangeStart={(value) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === id ? { ...attr, periodStart: value } : attr
              )
            )
          }
          onChangeEnd={(value) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === id ? { ...attr, periodEnd: value } : attr
              )
            )
          }
          onRemove={() => handleRemove(id)}
        />
      );
    case AttributeType.IMAGE:
      return (
        <ImageAttribute
          id={id}
          name={name}
          value={attributeValue.imageUrl!}
          onChange={(value) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === id ? { ...attr, imageUrl: value } : attr
              )
            )
          }
          onRemove={() => handleRemove(id)}
        />
      );
    case AttributeType.SELECT:
      return (
        <SelectAttribute
          value={attributeValue.optionId!}
          name={name}
          options={attributeValue.attribute.attributeOptions!}
          onChange={(value) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === id ? { ...attr, optionId: value } : attr
              )
            )
          }
          onRemove={() => handleRemove(id)}
        />
      );

    default:
      return null;
  }
}
