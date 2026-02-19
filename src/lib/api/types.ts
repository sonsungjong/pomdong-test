export type ServiceId =
  | "protocol-design"
  | "cohort-discovery"
  | "site-feasibility"
  | "recruitment-forecast"
  | "risk-monitor"
  | "budget-optimizer";

export type ServiceMaturity = "pilot" | "production" | "beta";

export interface ServiceMeta {
  id: ServiceId;
  code: string;
  name: string;
  description: string;
  ownerTeam: string;
  maturity: ServiceMaturity;
}

export interface ScenarioConfig {
  protocolName: string;
  phase: "I" | "II" | "III" | "IV";
  sampleSize: number;
  durationWeeks: number;
  dropoutRate: number;
  region: "KR" | "APAC" | "NA" | "EU";
  comparator: "placebo" | "standard-of-care";
  includePediatric: boolean;
  biomarkers: string[];
  startDate: string;
  notes: string;
}

export type SiteStatus = "on-track" | "watch" | "critical";

export interface SiteSimulationRecord {
  id: string;
  siteName: string;
  country: string;
  enrollmentTarget: number;
  enrollmentActual: number;
  screeningFailureRate: number;
  protocolDeviation: number;
  costKrwMillion: number;
  status: SiteStatus;
  updatedAt: string;
}

export interface SimulationSummary {
  projectedEnrollment: number;
  expectedCompletion: string;
  riskScore: number;
  estimatedCostKrwBillion: number;
}

export interface TimePoint {
  label: string;
  value: number;
}

export interface SimulationQuery {
  page: number;
  pageSize: number;
  search: string;
  status: "all" | SiteStatus;
  sortBy: "siteName" | "enrollmentActual" | "screeningFailureRate" | "costKrwMillion";
  sortOrder: "asc" | "desc";
  uiState: "normal" | "empty" | "error";
}

export interface SimulationResult {
  summary: SimulationSummary;
  monthlyTrend: TimePoint[];
  records: SiteSimulationRecord[];
  total: number;
  riskAlerts: string[];
}

export interface ReportSection {
  id: string;
  title: string;
  narrative: string;
  value: string;
  action: string;
}

export interface SimulationReport {
  generatedAt: string;
  owner: string;
  sections: ReportSection[];
  complianceFlags: string[];
}

export interface ApiEnvelope<T> {
  endpoint: string;
  schema: string;
  data: T;
}
