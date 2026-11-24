export interface Item {
  id: string;
  name: string;
  image: string;
  description: string;
}

export type Resource = "products" | "services";

export interface AboutBlock {
  id?: string;
  kind: "paragraph" | "heading" | "activities";
  text: string;
  displayOrder?: number;
}

export interface AboutActivity {
  id?: string;
  text: string;
  displayOrder?: number;
}

export interface AboutSection {
  id: string;
  type: "COMPANY_PROFILE" | "OUR_PROFILE" | "ASSOCIATE" | "CUSTOM";
  label: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  designation: string;
  qualifications: string;
  introduction: string;
  experience: string;
  visible: boolean;
  active: boolean;
  displayOrder: number;
  blocks: AboutBlock[];
  activities: AboutActivity[];
}

export interface AboutPage {
  id: string;
  heading: string;
  subtitle: string;
  sections: AboutSection[];
}
