import { AttributeType } from "~/types/Attribute";
import Boolean from "~/utils/attribute_types/Boolean";
import Date from "~/utils/attribute_types/Date";
import Image from "~/utils/attribute_types/Image";
import Number from "~/utils/attribute_types/Number";
import Period from "~/utils/attribute_types/Period";
import Select from "~/utils/attribute_types/Select";
import String from "~/utils/attribute_types/String";
import Text from "~/utils/attribute_types/Text";

export function AttributeTypeC({ type }: { type: AttributeType }) {
  if (type === AttributeType.NUMBER) {
    return <Number />;
  }

  if (type === AttributeType.STRING) {
    return <String />;
  }

  if (type === AttributeType.BOOLEAN) {
    return <Boolean />;
  }

  if (type === AttributeType.TEXT) {
    return <Text />;
  }

  if (type === AttributeType.DATE) {
    return <Date />;
  }

  if (type === AttributeType.IMAGE) {
    return <Image />;
  }

  if (type === AttributeType.PERIOD) {
    return <Period />;
  }

  if (type === AttributeType.SELECT) {
    return <Select />;
  }

  return null;
}
