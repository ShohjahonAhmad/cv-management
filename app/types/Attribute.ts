export type Attribute = {
    id: number;
    name: string;
    description: string;
    category: AttributeCategory;
    type: AttributeType;
    createdAt: string;
    updatedAt: string;
}

export enum AttributeCategory {
    PERSONAL_INFORMATION="PERSONAL_INFORMATION",
    CERTIFICATION="CERTIFICATION",
    DOMAIN_KNOWLEDGE="DOMAIN_KNOWLEDGE",
    SOFT_SKILLS="SOFT_SKILLS"
}
  
export enum AttributeType {
    STRING="STRING",
    TEXT="TEXT",
    IMAGE="IMAGE",
    NUMBER="NUMBER",
    DATE="DATE",
    PERIOD="PERIOD",
    BOOLEAN="BOOLEAN",
    SELECT="SELECT"
}