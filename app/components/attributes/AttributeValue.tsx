import type { AttributeValue } from "~/types/Profile";
import StringAttribute from "./StringAttribute";
import BooleanAttribute from "./BooleanAttribute";
import NumberAttribute from "./NumberAttribute";

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
  switch (attributeValue.attribute.type) {
    case "STRING":
      return (
        <StringAttribute
          name={attributeValue.attribute.name}
          value={attributeValue.stringValue!}
          onChange={(value: string) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === attributeValue.id
                  ? { ...attr, stringValue: value }
                  : attr
              )
            )
          }
          onRemove={() => handleRemove(attributeValue.id)}
        />
      );
    case "NUMBER":
      return (
        <NumberAttribute
          name={attributeValue.attribute.name}
          value={attributeValue.numericValue!}
          onChange={(value: number) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === attributeValue.id
                  ? { ...attr, numericValue: value }
                  : attr
              )
            )
          }
          onRemove={() => handleRemove(attributeValue.id)}
        />
      );
    case "BOOLEAN":
      return (
        <BooleanAttribute
          name={attributeValue.attribute.name}
          value={attributeValue.booleanValue!}
          onChange={(value: boolean) =>
            setAttributeValues((prev) =>
              prev.map((attr) =>
                attr.id === attributeValue.id
                  ? { ...attr, booleanValue: value }
                  : attr
              )
            )
          }
          onRemove={() => handleRemove(attributeValue.id)}
        />
      );
    default:
      return null;
  }
}
