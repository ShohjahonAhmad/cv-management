import { AttributeType, type Attribute } from "~/types/Attribute";
import NumberRow from "./NumberRow";
import BooleanRow from "./BooleanRow";
import StringRow from "./StringRow";
import DateRow from "./DateRow";
import SelectRow from "./SelectRow";
import TextRow from "./TextRow";
import ImageRow from "./ImageRow";
import PeriodRow from "./PeriodRow";

export default function AttributeRow({
  attribute,
  onChange,
}: {
  attribute: Attribute;
  onChange: () => void;
}) {
  switch (attribute.type) {
    case AttributeType.NUMBER:
      return <NumberRow attribute={attribute} onChange={onChange} />;
    case AttributeType.BOOLEAN:
      return <BooleanRow attribute={attribute} onChange={onChange} />;
    case AttributeType.STRING:
      return <StringRow attribute={attribute} onChange={onChange} />;
    case AttributeType.TEXT:
      return <TextRow attribute={attribute} onChange={onChange} />;
    case AttributeType.DATE:
      return <DateRow attribute={attribute} onChange={onChange} />;
    case AttributeType.PERIOD:
      return <PeriodRow attribute={attribute} onChange={onChange} />;
    case AttributeType.IMAGE:
      return <ImageRow attribute={attribute} onChange={onChange} />;
    case AttributeType.SELECT:
      return <SelectRow attribute={attribute} onChange={onChange} />;
    default:
      return null;
  }
}
