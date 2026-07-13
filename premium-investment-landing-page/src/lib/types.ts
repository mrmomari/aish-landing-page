export interface CompanyInfo {
  id: number;
  legal_name: string;
  display_name: string;
  tagline: string;
  description: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  registration_number: string;
  logo_url: string | null;
  updated_at: string;
}

export interface Holding {
  id: string;
  name: string;
  short_code: string;
  sector: string;
  stage: string;
  headline: string;
  description: string;
  website_url: string;
  contact_email: string;
  contact_phone: string;
  logo_url: string | null;
  accent_color: string;
  focus_tags: string[];
  sort_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface HoldingMedia {
  id: string;
  holding_id: string | null;
  url: string;
  caption: string;
  sort_order: number;
  created_at: string;
}

export type SectionKey =
  | "hero"
  | "company_info"
  | "social_proof"
  | "approach"
  | "portfolio"
  | "benefits"
  | "testimonials"
  | "partnerships"
  | "faq"
  | "contact";

export interface SectionSetting {
  section_key: SectionKey;
  label: string;
  visible: boolean;
  sort_order: number;
}
