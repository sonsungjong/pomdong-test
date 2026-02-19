import type {
  ReportSection,
  ScenarioConfig,
  ServiceId,
  ServiceMeta,
  SiteSimulationRecord,
  SiteStatus,
  SimulationSummary,
  TimePoint,
} from "@/lib/api/types";

export const SERVICE_CATALOG: ServiceMeta[] = [
  {
    id: "protocol-design",
    code: "PDS",
    name: "Protocol Design",
    description: "시험 설계 변수 조합과 기준군 전략을 시뮬레이션합니다.",
    ownerTeam: "Design Ops",
    maturity: "production",
  },
  {
    id: "cohort-discovery",
    code: "CHD",
    name: "Cohort Discovery",
    description: "대상자 조건 조합별 선별 효율과 모집 속도를 분석합니다.",
    ownerTeam: "Medical Data",
    maturity: "beta",
  },
  {
    id: "site-feasibility",
    code: "SFT",
    name: "Site Feasibility",
    description: "기관별 수행 가능성과 프로토콜 이탈 위험을 평가합니다.",
    ownerTeam: "Site Strategy",
    maturity: "production",
  },
  {
    id: "recruitment-forecast",
    code: "RCF",
    name: "Recruitment Forecast",
    description: "월별 enrollment 추정치와 목표 달성 시점을 예측합니다.",
    ownerTeam: "Enrollment PM",
    maturity: "pilot",
  },
  {
    id: "risk-monitor",
    code: "RKM",
    name: "Risk Monitor",
    description: "운영 리스크를 가시화하고 대응 우선순위를 제공합니다.",
    ownerTeam: "QA Governance",
    maturity: "beta",
  },
  {
    id: "budget-optimizer",
    code: "BGO",
    name: "Budget Optimizer",
    description: "운영비와 기관별 효율을 기반으로 예산안을 제안합니다.",
    ownerTeam: "Finance PMO",
    maturity: "pilot",
  },
];

export const SERVICE_INDEX = Object.fromEntries(SERVICE_CATALOG.map((service) => [service.id, service])) as Record<ServiceId, ServiceMeta>;

export function isServiceId(value: string): value is ServiceId {
  return Object.prototype.hasOwnProperty.call(SERVICE_INDEX, value);
}

export const BIOMARKER_OPTIONS = ["PD-L1", "EGFR", "ALK", "MSI-H", "HER2", "BRAF"];

const scenarioPreset: Record<ServiceId, Partial<ScenarioConfig>> = {
  "protocol-design": {
    protocolName: "PDS-2026-A",
    phase: "II",
    sampleSize: 220,
    durationWeeks: 40,
    dropoutRate: 12,
    region: "APAC",
  },
  "cohort-discovery": {
    protocolName: "CHD-2026-B",
    phase: "II",
    sampleSize: 160,
    durationWeeks: 30,
    dropoutRate: 10,
    region: "KR",
    biomarkers: ["PD-L1", "MSI-H"],
  },
  "site-feasibility": {
    protocolName: "SFT-2026-C",
    phase: "III",
    sampleSize: 340,
    durationWeeks: 52,
    dropoutRate: 16,
    region: "EU",
  },
  "recruitment-forecast": {
    protocolName: "RCF-2026-D",
    phase: "III",
    sampleSize: 410,
    durationWeeks: 48,
    dropoutRate: 14,
    region: "NA",
  },
  "risk-monitor": {
    protocolName: "RKM-2026-E",
    phase: "II",
    sampleSize: 190,
    durationWeeks: 36,
    dropoutRate: 18,
    region: "APAC",
  },
  "budget-optimizer": {
    protocolName: "BGO-2026-F",
    phase: "III",
    sampleSize: 360,
    durationWeeks: 56,
    dropoutRate: 15,
    region: "EU",
  },
};

export function createDefaultScenario(serviceId: ServiceId): ScenarioConfig {
  return {
    protocolName: `${SERVICE_INDEX[serviceId].code}-2026-BASE`,
    phase: "II",
    sampleSize: 180,
    durationWeeks: 36,
    dropoutRate: 14,
    region: "APAC",
    comparator: "standard-of-care",
    includePediatric: false,
    biomarkers: ["PD-L1", "EGFR"],
    startDate: "2026-04-01",
    notes: "초기 가정값입니다. 운영 회의에서 확정 후 시뮬레이션을 재실행하세요.",
    ...scenarioPreset[serviceId],
  };
}

function seededRatio(seed: string, index: number): number {
  const text = `${seed}:${index}`;
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const normalized = (hash >>> 0) % 1000;
  return normalized / 1000;
}

const cityPool = [
  "Seoul",
  "Busan",
  "Daegu",
  "Incheon",
  "Daejeon",
  "Gwangju",
  "Suwon",
  "Ulsan",
  "Changwon",
  "Cheongju",
  "Jeonju",
  "Yongin",
  "Pohang",
  "Anyang",
  "Wonju",
  "Jeju",
  "Gimhae",
  "Cheonan",
  "Sejong",
  "Guri",
  "Hanam",
  "Goyang",
  "Sacheon",
  "Namyangju",
];

const countryPool = ["KR", "US", "JP", "SG", "DE", "AU"];

function evaluateStatus(actual: number, target: number, failRate: number, deviation: number): SiteStatus {
  const pace = actual / target;
  if (failRate >= 27 || deviation >= 8 || pace < 0.65) {
    return "critical";
  }
  if (failRate >= 19 || deviation >= 5 || pace < 0.82) {
    return "watch";
  }
  return "on-track";
}

export function buildSiteRecords(serviceId: ServiceId, count = 28): SiteSimulationRecord[] {
  return Array.from({ length: count }, (_, index) => {
    const target = 40 + Math.round(seededRatio(`${serviceId}:target`, index) * 70);
    const pace = 0.52 + seededRatio(`${serviceId}:pace`, index) * 0.56;
    const actual = Math.min(target, Math.round(target * pace));
    const screeningFailureRate = 8 + Math.round(seededRatio(`${serviceId}:screen`, index) * 25);
    const protocolDeviation = Math.round(seededRatio(`${serviceId}:deviation`, index) * 10);
    const costKrwMillion = 80 + Math.round(seededRatio(`${serviceId}:cost`, index) * 170);
    const status = evaluateStatus(actual, target, screeningFailureRate, protocolDeviation);
    const month = String((index % 9) + 1).padStart(2, "0");
    const day = String(((index * 3) % 27) + 1).padStart(2, "0");
    return {
      id: `${serviceId}-${index + 1}`,
      siteName: `${cityPool[index % cityPool.length]} Site ${String(index + 1).padStart(2, "0")}`,
      country: countryPool[index % countryPool.length],
      enrollmentTarget: target,
      enrollmentActual: actual,
      screeningFailureRate,
      protocolDeviation,
      costKrwMillion,
      status,
      updatedAt: `2026-${month}-${day}`,
    };
  });
}

export function buildMonthlyTrend(serviceId: ServiceId): TimePoint[] {
  const labels = ["1M", "2M", "3M", "4M", "5M", "6M", "7M", "8M"];
  return labels.map((label, index) => {
    const baseline = 70 + index * 12;
    const offset = Math.round(seededRatio(`${serviceId}:trend`, index) * 20);
    return {
      label,
      value: baseline + offset,
    };
  });
}

export function buildSummary(records: SiteSimulationRecord[]): SimulationSummary {
  if (!records.length) {
    return {
      projectedEnrollment: 0,
      expectedCompletion: "-",
      riskScore: 0,
      estimatedCostKrwBillion: 0,
    };
  }

  const enrollment = records.reduce((sum, record) => sum + record.enrollmentActual, 0);
  const cost = records.reduce((sum, record) => sum + record.costKrwMillion, 0);
  const criticalCount = records.filter((record) => record.status === "critical").length;
  const watchCount = records.filter((record) => record.status === "watch").length;
  const riskScore = Math.min(98, 24 + criticalCount * 8 + watchCount * 3);
  const expectedCompletion = riskScore >= 60 ? "2027-01-15" : "2026-11-30";
  return {
    projectedEnrollment: enrollment + 120,
    expectedCompletion,
    riskScore,
    estimatedCostKrwBillion: Number((cost / 1000).toFixed(2)),
  };
}

export function buildReportSections(serviceId: ServiceId, summary: SimulationSummary): ReportSection[] {
  const service = SERVICE_INDEX[serviceId];
  const riskSignal = summary.riskScore >= 60 ? "높음" : "관리 가능";
  return [
    {
      id: "enrollment",
      title: "Enrollment 전망",
      narrative: `${service.name} 기준 현재 추정 모집수는 ${summary.projectedEnrollment.toLocaleString("ko-KR")}명이며, 목표 대비 속도는 안정 구간입니다.`,
      value: `${summary.projectedEnrollment.toLocaleString("ko-KR")}명`,
      action: "선별 실패율 상위 기관 5곳의 스크리닝 규칙 재검토",
    },
    {
      id: "timeline",
      title: "일정 영향",
      narrative: `완료 예상일은 ${summary.expectedCompletion}이며, 지연 가능성 신호는 ${riskSignal} 단계로 평가됩니다.`,
      value: summary.expectedCompletion,
      action: "기관별 주간 enrollment cap을 동적으로 재할당",
    },
    {
      id: "cost",
      title: "예산 영향",
      narrative: `총 예상 운영비는 ${summary.estimatedCostKrwBillion.toLocaleString("ko-KR")}B KRW 수준으로 추정됩니다.`,
      value: `${summary.estimatedCostKrwBillion.toLocaleString("ko-KR")}B KRW`,
      action: "비용 효율 하위 기관을 watch list에 추가하고 계약 조건 재조정",
    },
  ];
}

export function buildComplianceFlags(serviceId: ServiceId): string[] {
  const service = SERVICE_INDEX[serviceId];
  return [
    `${service.code} 시나리오 승인 대기`,
    "GCP 기준 데이터 무결성 점검 필요",
    "감사 로그 저장 정책 180일 유지",
  ];
}
