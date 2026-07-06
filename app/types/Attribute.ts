export type SelectedAttribute = {
    id: number;
    updatedAt: string; 
}

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

export type Dialog = {
    open: boolean;
    mode: "create" | "edit";
    attribute?: Attribute;
  };

// export type CreateAttributeFormError = {
//     errors: string[];
//     properties?: {
//       name?: {
//           errors: string[];
//       } | undefined;
//       description?: {
//           errors: string[];
//       } | undefined;
//       category?: {
//           errors: string[];
//       } | undefined;
//       type?: {
//           errors: string[];
//       } | undefined;
//     } | undefined;
// }