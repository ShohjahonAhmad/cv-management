import { AttributeCategory } from "~/types/Attribute";
import Certification from "~/utils/categories/Certification";
import DomainKnowledge from "~/utils/categories/DomainKnowledge";
import PersonalInformation from "~/utils/categories/PersonalInformation";
import SoftSkills from "~/utils/categories/SoftSkills";

export default function AttributeCategoryC({
  category,
}: {
  category: AttributeCategory;
}) {
  if (category === AttributeCategory.CERTIFICATION) {
    return <Certification />;
  }

  if (category === AttributeCategory.DOMAIN_KNOWLEDGE) {
    return <DomainKnowledge />;
  }

  if (category === AttributeCategory.PERSONAL_INFORMATION) {
    return <PersonalInformation />;
  }

  if (category === AttributeCategory.SOFT_SKILLS) {
    return <SoftSkills />;
  }
}
